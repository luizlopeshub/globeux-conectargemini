import { FormField, FormBlock } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'
import { ActiveItem } from '@/pages/Constructor'

interface Props {
  activeItem: ActiveItem
  fields: FormField[]
  blocks: FormBlock[]
  handleUpdateField: (id: string, updates: Partial<FormField>) => void
  handleUpdateBlock: (id: string, updates: Partial<FormBlock>) => void
}

export function PropertiesPanel({
  activeItem,
  fields,
  blocks,
  handleUpdateField,
  handleUpdateBlock,
}: Props) {
  const { entityDefs } = useAppStore()

  if (!activeItem) return null

  if (activeItem.type === 'block') {
    const activeBlock = blocks.find((b) => b.id === activeItem.id)
    if (!activeBlock) return null

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 pb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Bloco de Informações</Label>
            <Input
              value={activeBlock.name}
              onChange={(e) => handleUpdateBlock(activeBlock.id, { name: e.target.value })}
            />
          </div>
          <div className="pt-4 border-t space-y-4">
            <h4 className="font-medium text-sm text-primary">Lógica de Visibilidade do Bloco</h4>
            <div className="space-y-2">
              <Label>Exibir este bloco apenas se:</Label>
              <Select
                value={activeBlock.logicDependsOn || 'none'}
                onValueChange={(val) =>
                  handleUpdateBlock(activeBlock.id, {
                    logicDependsOn: val === 'none' ? undefined : val,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sempre visível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sempre visível</SelectItem>
                  {fields.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {activeBlock.logicDependsOn && (
              <div className="space-y-2">
                <Label>Valor Esperado (Exato)</Label>
                <Input
                  value={activeBlock.logicValue || ''}
                  onChange={(e) =>
                    handleUpdateBlock(activeBlock.id, { logicValue: e.target.value })
                  }
                  placeholder="Ex: Carga Avariada"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const activeField = fields.find((f) => f.id === activeItem.id)
  if (!activeField) return null

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 pb-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Label da Pergunta</Label>
          <Input
            value={activeField.label}
            onChange={(e) => handleUpdateField(activeField.id, { label: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Pertence ao Bloco</Label>
          <Select
            value={activeField.blockId}
            onValueChange={(val) => handleUpdateField(activeField.id, { blockId: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {blocks.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label>Obrigatório?</Label>
          <Switch
            checked={activeField.required}
            onCheckedChange={(c) => handleUpdateField(activeField.id, { required: c })}
          />
        </div>

        {(activeField.type === 'radio' || activeField.type === 'checkbox') && (
          <div className="space-y-2">
            <Label>Opções (separadas por vírgula)</Label>
            <Input
              value={activeField.options || ''}
              onChange={(e) => handleUpdateField(activeField.id, { options: e.target.value })}
              placeholder="Ex: Sim, Não, N/A"
            />
          </div>
        )}

        {activeField.type === 'lookup' && (
          <div className="space-y-2">
            <Label>Tipo de Entidade Restrita</Label>
            <Select
              value={activeField.lookupSource || 'any'}
              onValueChange={(val) =>
                handleUpdateField(activeField.id, { lookupSource: val === 'any' ? undefined : val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer (Usuário escolhe na hora)</SelectItem>
                {entityDefs.map((def) => (
                  <SelectItem key={def.id} value={def.id}>
                    {def.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="pt-4 border-t space-y-4">
          <h4 className="font-medium text-sm text-primary">Lógica de Visibilidade do Campo</h4>
          <div className="space-y-2">
            <Select
              value={activeField.logicDependsOn || 'none'}
              onValueChange={(val) =>
                handleUpdateField(activeField.id, {
                  logicDependsOn: val === 'none' ? undefined : val,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sempre visível</SelectItem>
                {fields
                  .filter((f) => f.id !== activeField.id)
                  .map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {activeField.logicDependsOn && (
            <div className="space-y-2">
              <Label>Valor Esperado</Label>
              <Input
                value={activeField.logicValue || ''}
                onChange={(e) => handleUpdateField(activeField.id, { logicValue: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
