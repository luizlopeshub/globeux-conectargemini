import { FormField } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Camera, MapPin, Edit3, ChevronsUpDown, Check } from 'lucide-react'
import { useMemo } from 'react'
import useAppStore from '@/stores/useAppStore'

interface Props {
  field: FormField
  value: any
  onChange: (val: any) => void
  allAnswers: Record<string, any>
  error?: string
}

export function FieldRenderer({ field, value, onChange, allAnswers, error }: Props) {
  const store = useAppStore()
  const options = field.options ? field.options.split(',').map((s) => s.trim()) : []

  const calcValue = useMemo(() => {
    if (field.type !== 'calculation') return 0
    const sources = field.calcSourceFields || []
    if (sources.length === 0) return 0
    const vals = sources.map((id) => Number(allAnswers[id]) || 0)
    const sum = vals.reduce((acc, curr) => acc + curr, 0)
    if (field.calcOperation === 'average') return vals.length ? (sum / vals.length).toFixed(2) : 0
    return sum
  }, [field.type, field.calcOperation, field.calcSourceFields, allAnswers])

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
        const entityDef = store.entityDefs.find((d) => d.id === field.lookupSource)
        const items = store.entityRecords.filter((r) => r.entityId === field.lookupSource)
        const primaryFieldId = entityDef?.fields[0]?.id || 'id'

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-between h-12 bg-white font-normal ${error ? 'border-destructive' : ''}`}
              >
                {value
                  ? items.find((i: any) => i.id === value)?.[primaryFieldId]
                  : 'Selecione o registro...'}
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandList>
                  <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: any) => (
                      <CommandItem key={item.id} onSelect={() => onChange(item.id)}>
                        <Check
                          className={`mr-2 h-4 w-4 ${value === item.id ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {item[primaryFieldId]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
            <Camera className="h-4 w-4 text-blue-500" /> Tirar Foto
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
    <Card
      className={`border-muted shadow-sm ${error ? 'border-destructive/50 ring-1 ring-destructive/50' : ''}`}
    >
      <CardContent className="p-5">
        <Label className="text-base font-medium mb-4 block">
          {field.label} {field.required && <span className="text-destructive">*</span>}
        </Label>
        {renderInput()}
        {error && <p className="text-sm font-medium text-destructive mt-3">{error}</p>}
      </CardContent>
    </Card>
  )
}
