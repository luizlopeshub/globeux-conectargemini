import { Button } from '@/components/ui/button'
import { FieldType } from '@/types'
import {
  Type,
  Hash,
  ListFilter,
  SquareCheckBig,
  MapPin,
  Camera,
  Signature,
  Calculator,
  Database,
  Plus,
  Calendar,
  Star,
} from 'lucide-react'

export function Toolbox({
  onAdd,
  onAddBlock,
  selectedBlockId,
}: {
  onAdd: (t: FieldType, targetBlockId?: string) => void
  onAddBlock: () => void
  selectedBlockId?: string | null
}) {
  const tools: { type: FieldType; icon: any; label: string }[] = [
    { type: 'text', icon: Type, label: 'Texto Curto' },
    { type: 'number', icon: Hash, label: 'Número' },
    { type: 'radio', icon: ListFilter, label: 'Seleção Única' },
    { type: 'checkbox', icon: SquareCheckBig, label: 'Múltipla Escolha' },
    { type: 'lookup', icon: Database, label: 'Seleção de Cadastro' },
    { type: 'date', icon: Calendar, label: 'Data' },
    { type: 'rating', icon: Star, label: 'Avaliação' },
    { type: 'gps', icon: MapPin, label: 'Localização GPS' },
    { type: 'camera', icon: Camera, label: 'Foto / Câmera' },
    { type: 'signature', icon: Signature, label: 'Assinatura' },
    { type: 'calculation', icon: Calculator, label: 'Cálculo' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={onAddBlock} variant="default" size="sm" className="gap-2 shrink-0 shadow-sm">
        <Plus className="h-4 w-4" />
        Adicionar Bloco
      </Button>

      <div className="h-6 w-px bg-border mx-1 shrink-0 hidden sm:block" />

      {tools.map((tool) => (
        <Button
          key={tool.type}
          variant="outline"
          size="sm"
          className="gap-2 bg-background hover:bg-muted shrink-0 shadow-sm"
          onClick={() => onAdd(tool.type, selectedBlockId || undefined)}
        >
          <tool.icon className="h-4 w-4 text-primary" />
          {tool.label}
        </Button>
      ))}
    </div>
  )
}
