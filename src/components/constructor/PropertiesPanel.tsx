import { FormField } from '@/types'
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
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  activeField: FormField
  fields: FormField[]
  handleUpdateField: (id: string, updates: Partial<FormField>) => void
}

export function PropertiesPanel({ activeField, fields, handleUpdateField }: Props) {
  const numericFields = fields.filter((f) => f.id !== activeField.id && f.type === 'number')

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
          <div className="pt-4 border-t space-y-4">
            <div className="space-y-2">
              <Label>Tabela Fonte de Dados</Label>
              <Select
                value={activeField.lookupSource || 'clients'}
                onValueChange={(val: any) =>
                  handleUpdateField(activeField.id, { lookupSource: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clients">Clientes</SelectItem>
                  <SelectItem value="products">Produtos</SelectItem>
                  <SelectItem value="carriers">Transportadoras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {activeField.type === 'number' && (
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-destructive font-semibold">Hard Validation (Bloqueio)</Label>
              <Switch
                checked={activeField.hardValidation}
                onCheckedChange={(c) => handleUpdateField(activeField.id, { hardValidation: c })}
              />
            </div>
            {activeField.hardValidation && (
              <div className="space-y-4 bg-red-50 p-3 rounded-md border border-red-100">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Valor Mínimo</Label>
                    <Input
                      type="number"
                      value={activeField.hardValidationMin ?? ''}
                      onChange={(e) =>
                        handleUpdateField(activeField.id, {
                          hardValidationMin: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Valor Máximo</Label>
                    <Input
                      type="number"
                      value={activeField.hardValidationMax ?? ''}
                      onChange={(e) =>
                        handleUpdateField(activeField.id, {
                          hardValidationMax: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Mensagem de Erro</Label>
                  <Input
                    value={activeField.hardValidationMessage || ''}
                    onChange={(e) =>
                      handleUpdateField(activeField.id, { hardValidationMessage: e.target.value })
                    }
                    placeholder="Ex: Fora do limite."
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeField.type === 'calculation' && (
          <div className="pt-4 border-t space-y-4">
            <div className="space-y-2">
              <Label>Operação</Label>
              <Select
                value={activeField.calcOperation || 'sum'}
                onValueChange={(val: any) =>
                  handleUpdateField(activeField.id, { calcOperation: val })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sum">Soma (Sum)</SelectItem>
                  <SelectItem value="average">Média (Average)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Campos Fonte</Label>
              <div className="border rounded-md p-2 max-h-32 overflow-y-auto space-y-2 bg-background">
                {numericFields.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-2">Sem campos numéricos.</p>
                ) : (
                  numericFields.map((f) => {
                    const isSelected = activeField.calcSourceFields?.includes(f.id)
                    return (
                      <div key={f.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`calc-${f.id}`}
                          checked={isSelected}
                          onCheckedChange={(c) => {
                            const current = activeField.calcSourceFields || []
                            handleUpdateField(activeField.id, {
                              calcSourceFields: c
                                ? [...current, f.id]
                                : current.filter((id) => id !== f.id),
                            })
                          }}
                        />
                        <label
                          htmlFor={`calc-${f.id}`}
                          className="text-sm font-medium leading-none cursor-pointer truncate"
                        >
                          {f.label}
                        </label>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t space-y-4">
        <h4 className="font-medium text-sm text-primary">Lógica de Visibilidade</h4>
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
                    {f.label} ({f.id})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
