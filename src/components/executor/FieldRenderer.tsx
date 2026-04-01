import { FormField } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, MapPin, Edit3, Loader2, AlertTriangle, Calculator } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
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
}: Props) {
  const store = useAppStore()
  const { id } = useParams()
  const [isUploading, setIsUploading] = useState(false)

  const options = field.options ? field.options.split(',').map((s) => s.trim()) : []

  const dependentValues = useMemo(() => {
    if (field.type !== 'calculation') return ''
    if (field.formula) {
      const matches = field.formula.match(/\[([^\]]+)\]/g)
      if (!matches) return ''
      return matches
        .map((m) => {
          const id = m.slice(1, -1)
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
        if (matches) {
          matches.forEach((match) => {
            const id = match.slice(1, -1)
            const val = Number(allAnswers[id]) || 0
            expression = expression.replace(match, String(val))
          })
        }

        // Only allow safe math characters to be evaluated
        if (/^[0-9+\-*/().\s]+$/.test(expression)) {
          // eslint-disable-next-line no-new-func
          calculatedValue = new Function('return ' + expression)()
        }
      } catch (e) {
        console.error('Erro na fórmula de cálculo:', e)
      }
    } else if (field.calcSourceFields?.length) {
      const vals = field.calcSourceFields.map((id) => Number(allAnswers[id]) || 0)
      const sum = vals.reduce((acc, curr) => acc + curr, 0)
      calculatedValue = field.calcOperation === 'average' && vals.length ? sum / vals.length : sum
    }

    if (field.unit_category && field.unit_source && field.unit_target) {
      calculatedValue = convertUnit(
        calculatedValue,
        field.unit_category as any,
        field.unit_source,
        field.unit_target,
      )
    }

    const finalVal = Number(calculatedValue.toFixed(4))

    if (value !== finalVal && !isNaN(finalVal)) {
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

      if (id) {
        try {
          record = await pb.collection('responses').update(id, formData)
        } catch (err) {
          try {
            const existing = await pb.collection('responses').getFirstListItem(`task_id="${id}"`)
            record = await pb.collection('responses').update(existing.id, formData)
          } catch (err2) {
            console.warn(
              'Nenhum registro de resposta encontrado, a imagem será salva localmente até o envio.',
            )
          }
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
            value={value}
            onChange={onChange}
            defaultEntityType={defaultEntityType}
            allowEntityChange={!defaultEntityType}
            error={!!error}
            dataSourceType={dataSourceType as any}
            apiUrl={field.apiUrl}
            apiMapping={field.apiMapping}
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

        return (
          <div className="bg-slate-50 p-4 rounded-md border flex items-center justify-between shadow-inner ring-1 ring-black/5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40"></div>
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-primary/60" />
              <span className="font-mono text-2xl font-bold text-slate-800">
                = {Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
              </span>
            </div>
            {targetUnitLabel && (
              <span className="text-sm font-medium text-slate-600 bg-white border px-2.5 py-1 rounded shadow-sm">
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
