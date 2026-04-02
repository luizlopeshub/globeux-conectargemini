import { FormField, LogicCondition } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, MapPin, Edit3, Loader2, AlertTriangle, Calculator } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SmartLookup } from '@/components/SmartLookup'
import pb from '@/lib/pocketbase/client'
import { convertUnit, UNITS } from '@/lib/utils/conversions'

interface Props {
  field: FormField
  value: any
  onChange: (val: any) => void
  allAnswers: Record<string, any>
  error?: string
  alert?: string
  dynamicRequired?: boolean
  onUploadStart?: () => void
  onUploadEnd?: () => void
  allFields?: FormField[]
}

export function calculateFieldVisibility(
  field: FormField,
  allResponses: Record<string, any>,
  allFields: FormField[] = [],
): boolean {
  if (field.alwaysVisible === true) return true

  const hasLegacyDependsOn = field.logicDependsOn && field.logicDependsOn !== 'none'
  const hasRelatedField = !!field.relatedFieldId

  let hasAdvancedRule = false
  let advancedVisible = false

  const evaluateCondition = (actual: any, condition: LogicCondition, expected: any) => {
    const a = String(actual || '').toLowerCase()
    const e = String(expected || '').toLowerCase()
    const numA = Number(actual)
    const numE = Number(expected)

    switch (condition) {
      case 'equals':
        return a === e
      case 'not_equals':
        return a !== e
      case 'greater_than':
        return !isNaN(numA) && !isNaN(numE) ? numA > numE : a > e
      case 'less_than':
        return !isNaN(numA) && !isNaN(numE) ? numA < numE : a < e
      case 'greater_than_or_equal':
        return !isNaN(numA) && !isNaN(numE) ? numA >= numE : a >= e
      case 'less_than_or_equal':
        return !isNaN(numA) && !isNaN(numE) ? numA <= numE : a <= e
      default:
        return false
    }
  }

  // Evaluate rules defined on THIS field (target-based: SET_VISIBLE / SET_HIDDEN)
  if (field.logicRules?.length) {
    for (const rule of field.logicRules) {
      if (rule.action === 'SET_VISIBLE' || rule.action === 'SET_HIDDEN') {
        hasAdvancedRule = true
        const sourceVal = allResponses[rule.sourceFieldId]
        if (evaluateCondition(sourceVal, rule.condition, rule.value)) {
          return rule.action === 'SET_VISIBLE'
        }
      }
    }
  }

  // Evaluate rules defined on OTHER fields targeting this field (source-based: SHOW_FIELD / HIDE_FIELD)
  if (!hasAdvancedRule && allFields.length > 0) {
    for (const otherField of allFields) {
      if (otherField.logicRules?.length) {
        for (const rule of otherField.logicRules) {
          if (
            (rule.action === 'SHOW_FIELD' || rule.action === 'HIDE_FIELD') &&
            rule.targetId === field.id
          ) {
            hasAdvancedRule = true
            const sourceVal = allResponses[otherField.id]
            if (evaluateCondition(sourceVal, rule.condition, rule.value)) {
              return rule.action === 'SHOW_FIELD'
            }
          }
        }
      }
    }
  }

  // If a rule targeted this field but no condition was met, default to the opposite of its primary intent
  if (hasAdvancedRule) {
    let hasShowIntent = field.logicRules?.some((r) => r.action === 'SET_VISIBLE') || false
    if (!hasShowIntent && allFields.length > 0) {
      hasShowIntent = allFields.some((f) =>
        f.logicRules?.some((r) => r.action === 'SHOW_FIELD' && r.targetId === field.id),
      )
    }
    return !hasShowIntent
  }

  // Basic fallbacks
  const checkMatch = (
    actual: any,
    expected: string | string[] | undefined,
    operator: LogicCondition = 'equals',
  ) => {
    if (operator === 'equals') {
      const actualStr = String(actual || '').toLowerCase()
      if (Array.isArray(expected)) {
        return expected.some((v) => String(v || '').toLowerCase() === actualStr)
      }
      return actualStr === String(expected || '').toLowerCase()
    } else {
      const expectedVal = Array.isArray(expected) ? expected[0] : expected
      return evaluateCondition(actual, operator, expectedVal)
    }
  }

  if (hasRelatedField) {
    return checkMatch(allResponses[field.relatedFieldId!], field.expectedValue, field.logicOperator)
  }

  if (hasLegacyDependsOn) {
    return checkMatch(allResponses[field.logicDependsOn!], field.logicValue, field.logicOperator)
  }

  if (field.alwaysVisible === false) return false
  return true
}

export function FieldRenderer({
  field,
  value,
  onChange,
  allAnswers,
  error,
  alert,
  dynamicRequired,
  onUploadStart,
  onUploadEnd,
  allFields = [],
}: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const taskId = searchParams.get('taskId')

  const options = field.options ? field.options.split(',').map((s) => s.trim()) : []

  const dependentValues = useMemo(() => {
    if (field.type !== 'calculation') return ''
    if (field.formula) {
      const matches = field.formula.match(/\[([^\]]+)\]/g)
      if (!matches) return ''
      return matches
        .map((m) => {
          const id = m.slice(1, -1).trim()
          return `${id}:${allAnswers[id] || 0}`
        })
        .join(',')
    }
    if (field.calcSourceFields) {
      return field.calcSourceFields.map((id) => `${id}:${allAnswers[id] || 0}`).join(',')
    }
    return ''
  }, [field.formula, field.calcSourceFields, allAnswers, field.type])

  useEffect(() => {
    if (field.type !== 'calculation') return

    let calculatedValue = 0

    if (field.formula) {
      try {
        let expression = field.formula
        const matches = expression.match(/\[([^\]]+)\]/g)
        let hasEmptyField = false

        if (matches) {
          matches.forEach((match) => {
            const id = match.slice(1, -1).trim()
            const rawVal = allAnswers[id]
            if (rawVal === undefined || rawVal === null || rawVal === '') {
              hasEmptyField = true
            }
            const val = Number(rawVal) || 0
            expression = expression.replace(match, `(${val})`)
          })
        }

        if (hasEmptyField) {
          calculatedValue = 0
        } else {
          // Only allow safe math characters to be evaluated
          const safeExpression = expression.replace(/[eE]/g, '')
          if (/^[0-9+\-*/().\s]+$/.test(safeExpression)) {
            // eslint-disable-next-line no-new-func
            calculatedValue = new Function('return ' + expression)()
            if (!isFinite(calculatedValue) || isNaN(calculatedValue)) {
              calculatedValue = 0
            }
          } else {
            calculatedValue = 0
          }
        }
      } catch (e) {
        console.error('Erro na fórmula de cálculo:', e)
        calculatedValue = 0
      }
    } else if (field.calcSourceFields?.length) {
      let hasEmptyField = false
      const vals = field.calcSourceFields.map((id) => {
        const val = allAnswers[id]
        if (val === undefined || val === null || val === '') {
          hasEmptyField = true
          return 0
        }
        const num = Number(val)
        return isNaN(num) ? 0 : num
      })

      if (hasEmptyField) {
        calculatedValue = 0
      } else {
        const sum = vals.reduce((acc, curr) => acc + curr, 0)
        calculatedValue = field.calcOperation === 'average' && vals.length ? sum / vals.length : sum
      }
    }
    if (field.unit_category && field.unit_source && field.unit_target) {
      calculatedValue = convertUnit(
        calculatedValue,
        field.unit_category as any,
        field.unit_source,
        field.unit_target,
      )
    }

    const finalVal = isNaN(calculatedValue) ? 0 : Number(calculatedValue.toFixed(4))

    if (value !== finalVal) {
      // Delay to prevent React render loop warnings when multiple calcs exist
      setTimeout(() => onChange(finalVal), 0)
    }
  }, [
    dependentValues,
    field.formula,
    field.calcSourceFields,
    field.calcOperation,
    field.unit_category,
    field.unit_source,
    field.unit_target,
    field.type,
  ])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    onUploadStart?.()
    try {
      const formData = new FormData()
      formData.append('images', file)

      let record

      if (taskId) {
        try {
          const existing = await pb.collection('responses').getFirstListItem(`task_id="${taskId}"`)
          record = await pb.collection('responses').update(existing.id, formData)
        } catch (err) {
          console.warn(
            'Nenhum registro de resposta encontrado, a imagem será salva localmente até o envio.',
          )
        }
      }

      if (record && record.images && record.images.length > 0) {
        const fileName = record.images[record.images.length - 1]
        const url = pb.files.getUrl(record, fileName)
        onChange(url)
      } else {
        onChange(URL.createObjectURL(file))
      }
    } catch (error) {
      console.error('Falha no upload:', error)
      onChange(URL.createObjectURL(file))
    } finally {
      setIsUploading(false)
      onUploadEnd?.()
    }
  }

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`h-12 bg-white ${error ? 'border-destructive' : ''}`}
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`h-12 bg-white ${error ? 'border-destructive' : ''}`}
          />
        )
      case 'lookup': {
        const explicitSource = field.dataSourceType || field.settings?.source
        const dataSourceType = explicitSource || (field.lookupSource ? 'internal' : 'master_data')
        const defaultEntityType =
          dataSourceType === 'master_data'
            ? field.settings?.entitySlug || field.lookupEntitySlug
            : field.lookupSource

        return (
          <SmartLookup
            value={value || ''}
            onChange={onChange}
            entitySlug={defaultEntityType}
            placeholder="Selecione um registro..."
          />
        )
      }
      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3">
            {options.map((opt) => (
              <div
                key={opt}
                className="flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer"
              >
                <RadioGroupItem value={opt} id={`${field.id}-${opt}`} />
                <Label htmlFor={`${field.id}-${opt}`} className="flex-1 cursor-pointer">
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'checkbox':
        return (
          <div className="flex flex-col gap-3">
            {options.map((opt) => (
              <div
                key={opt}
                className="flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer"
              >
                <Checkbox
                  id={`${field.id}-${opt}`}
                  checked={Array.isArray(value) && value.includes(opt)}
                  onCheckedChange={(c) => {
                    const current = Array.isArray(value) ? value : []
                    onChange(c ? [...current, opt] : current.filter((v) => v !== opt))
                  }}
                />
                <Label htmlFor={`${field.id}-${opt}`} className="flex-1 cursor-pointer">
                  {opt}
                </Label>
              </div>
            ))}
          </div>
        )
      case 'gps':
        return value ? (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-md border border-emerald-200 flex items-center gap-2 font-mono text-sm">
            <MapPin className="h-4 w-4" /> Coord: {value}
          </div>
        ) : (
          <Button
            variant="outline"
            className="h-12 w-full gap-2 bg-white"
            onClick={() => onChange('-23.5505, -46.6333')}
          >
            <MapPin className="h-4 w-4 text-blue-500" /> Capturar Localização
          </Button>
        )
      case 'camera': {
        const imgUrl =
          value instanceof File
            ? URL.createObjectURL(value)
            : typeof value === 'string' && value.startsWith('http')
              ? value
              : null

        return value && imgUrl ? (
          <div className="relative rounded-md overflow-hidden border">
            <img src={imgUrl} alt="Captura" className="w-full h-48 object-cover bg-slate-50" />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => onChange(null)}
            >
              Remover
            </Button>
          </div>
        ) : (
          <div className="relative">
            {isUploading ? (
              <div className="h-12 w-full flex items-center justify-center gap-2 bg-slate-50 border rounded-md text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando imagem...</span>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  capture="environment"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0])
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <Button
                  variant="outline"
                  className="h-12 w-full gap-2 bg-white relative z-0"
                  type="button"
                  disabled={isUploading}
                >
                  <Camera className="h-4 w-4 text-blue-500" /> Tirar Foto ou Escolher Arquivo
                </Button>
              </>
            )}
          </div>
        )
      }
      case 'signature':
        return value ? (
          <div className="border rounded-md bg-white p-4 text-center">
            <img
              src="https://img.usecurling.com/i?q=signature&shape=hand-drawn"
              alt="Assinatura"
              className="h-24 mx-auto opacity-70"
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono">Assinado digitalmente</p>
          </div>
        ) : (
          <Button
            variant="outline"
            className="h-24 w-full border-dashed gap-2 bg-white flex flex-col"
            onClick={() => onChange('signed')}
          >
            <Edit3 className="h-6 w-6 text-muted-foreground" />
            <span className="text-muted-foreground">Toque para Assinar</span>
          </Button>
        )
      case 'calculation': {
        const targetUnitLabel =
          field.unit_category && field.unit_target
            ? UNITS[field.unit_category as keyof typeof UNITS]?.find(
                (u) => u.id === field.unit_target,
              )?.label || field.unit_target
            : ''

        const formattedValue = Number(value || 0).toLocaleString('pt-BR', {
          maximumFractionDigits: 4,
        })

        return (
          <div className="relative flex items-center">
            <Calculator className="absolute left-3 h-5 w-5 text-primary/60 z-10" />
            <Input
              type="text"
              readOnly
              value={`= ${formattedValue}`}
              className="h-12 pl-10 pr-16 bg-slate-50/50 font-mono text-lg font-bold text-slate-800 focus-visible:ring-0 border-primary/20 cursor-not-allowed shadow-inner"
            />
            {targetUnitLabel && (
              <span className="absolute right-3 text-xs font-medium text-slate-500 bg-white border px-2 py-0.5 rounded shadow-sm z-10">
                {targetUnitLabel}
              </span>
            )}
          </div>
        )
      }
      default:
        return null
    }
  }

  const isVisible = useMemo(
    () => calculateFieldVisibility(field, allAnswers, allFields),
    [field, allAnswers, allFields],
  )

  if (!isVisible) return null

  return (
    <Card
      className={`border-muted shadow-sm ${error ? 'border-destructive/50 ring-1 ring-destructive/50' : ''}`}
    >
      <CardContent className="p-5">
        <Label className="text-base font-medium mb-4 block">
          {field.label}{' '}
          {(field.required || dynamicRequired) && <span className="text-destructive">*</span>}
        </Label>
        {renderInput()}
        {error && <p className="text-sm font-medium text-destructive mt-3">{error}</p>}
        {alert && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-sm flex items-start gap-2 animate-in fade-in duration-300">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{alert}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
