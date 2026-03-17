import { Button } from '@/components/ui/button'
import { FieldType } from '@/types'
import {
  Type,
  Hash,
  ListFilter,
  CheckSquare,
  MapPin,
  Camera,
  Signature,
  Calculator,
} from 'lucide-react'

export function Toolbox({ onAdd }: { onAdd: (t: FieldType) => void }) {
  const tools: { type: FieldType; icon: any; label: string }[] = [
    { type: 'text', icon: Type, label: 'Texto Curto' },
    { type: 'number', icon: Hash, label: 'Número' },
    { type: 'radio', icon: ListFilter, label: 'Seleção Única' },
    { type: 'checkbox', icon: CheckSquare, label: 'Múltipla Escolha' },
    { type: 'gps', icon: MapPin, label: 'Localização GPS' },
    { type: 'camera', icon: Camera, label: 'Foto / Câmera' },
    { type: 'signature', icon: Signature, label: 'Assinatura' },
    { type: 'calculation', icon: Calculator, label: 'Cálculo' },
  ]

  return (
    <div className="space-y-2 pb-6">
      {tools.map((tool) => (
        <Button
          key={tool.type}
          variant="outline"
          className="w-full justify-start gap-3 bg-background hover:bg-muted"
          onClick={() => onAdd(tool.type)}
        >
          <tool.icon className="h-4 w-4 text-primary" />
          {tool.label}
        </Button>
      ))}
    </div>
  )
}
