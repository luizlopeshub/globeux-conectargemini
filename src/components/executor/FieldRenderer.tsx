import { FormField } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, MapPin, Edit3 } from 'lucide-react'
import { useMemo } from 'react'

interface Props {
  field: FormField
  value: any
  onChange: (val: any) => void
  allAnswers: Record<string, any>
}

export function FieldRenderer({ field, value, onChange, allAnswers }: Props) {
  const options = field.options ? field.options.split(',').map((s) => s.trim()) : []

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 bg-white"
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 bg-white"
          />
        )
      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3">
            {options.map((opt) => (
              <div
                key={opt}
                className="flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors cursor-pointer"
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
            {options.map((opt) => {
              const isChecked = Array.isArray(value) && value.includes(opt)
              return (
                <div
                  key={opt}
                  className="flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer"
                >
                  <Checkbox
                    id={`${field.id}-${opt}`}
                    checked={isChecked}
                    onCheckedChange={(c) => {
                      const current = Array.isArray(value) ? value : []
                      onChange(c ? [...current, opt] : current.filter((v) => v !== opt))
                    }}
                  />
                  <Label htmlFor={`${field.id}-${opt}`} className="flex-1 cursor-pointer">
                    {opt}
                  </Label>
                </div>
              )
            })}
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
            <MapPin className="h-4 w-4 text-blue-500" /> Capturar Localização Atual
          </Button>
        )
      case 'camera':
        return value ? (
          <div className="relative rounded-md overflow-hidden border">
            <img src={value} alt="Captura" className="w-full h-48 object-cover" />
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
          <Button
            variant="outline"
            className="h-12 w-full gap-2 bg-white"
            onClick={() => onChange('https://img.usecurling.com/p/400/300?q=warehouse')}
          >
            <Camera className="h-4 w-4 text-blue-500" /> Tirar Foto da Avaria
          </Button>
        )
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
      case 'calculation':
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const calcValue = useMemo(() => {
          if (!field.calculation) return 0
          try {
            let formula = field.calculation
            Object.keys(allAnswers).forEach((key) => {
              const val = Number(allAnswers[key]) || 0
              formula = formula.replace(new RegExp(`{{${key}}}`, 'g'), val.toString())
            })
            // eslint-disable-next-line no-eval
            return eval(formula)
          } catch {
            return 'Erro na fórmula'
          }
        }, [field.calculation])

        return (
          <div className="bg-slate-100 p-4 rounded-md border font-mono text-lg font-semibold text-primary">
            = {calcValue}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-muted shadow-sm">
      <CardContent className="p-5">
        <Label className="text-base font-medium mb-4 block">
          {field.label} {field.required && <span className="text-destructive">*</span>}
        </Label>
        {renderInput()}
      </CardContent>
    </Card>
  )
}
