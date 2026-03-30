import { FormField, FormBlock, ActiveItem } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import useAppStore from '@/stores/useAppStore'
import { Skeleton } from '@/components/ui/skeleton'

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
  const [masterEntities, setMasterEntities] = useState<any[]>([])
  const [loadingEntities, setLoadingEntities] = useState(false)

  const activeField =
    activeItem?.type === 'field' ? fields.find((f) => f.id === activeItem.id) : undefined

  useEffect(() => {
    if (
      activeField?.type === 'lookup' &&
      (!activeField.dataSourceType || activeField.dataSourceType === 'master_data')
    ) {
      setLoadingEntities(true)
      pb.collection('entity_definitions')
        .getFullList()
        .then((res) => setMasterEntities(res))
        .catch(console.error)
        .finally(() => setLoadingEntities(false))
    }
  }, [activeField?.type, activeField?.dataSourceType])

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

        {['radio', 'checkbox', 'select'].includes(activeField.type) && (
          <div className="space-y-3">
            <Label>Gerenciar Opções</Label>
            <div className="space-y-2">
              {(typeof activeField.options === 'string' ? activeField.options.split(',') : []).map(
                (opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const currentOptions =
                          typeof activeField.options === 'string'
                            ? activeField.options.split(',')
                            : []
                        currentOptions[idx] = e.target.value.replace(/,/g, '')
                        handleUpdateField(activeField.id, {
                          options: currentOptions.length > 0 ? currentOptions.join(',') : undefined,
                        })
                      }}
                      placeholder={`Opção ${idx + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        const currentOptions =
                          typeof activeField.options === 'string'
                            ? activeField.options.split(',')
                            : []
                        currentOptions.splice(idx, 1)
                        handleUpdateField(activeField.id, {
                          options: currentOptions.length > 0 ? currentOptions.join(',') : undefined,
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                const currentOptions =
                  typeof activeField.options === 'string' ? activeField.options.split(',') : []
                currentOptions.push('')
                handleUpdateField(activeField.id, { options: currentOptions.join(',') })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Opção
            </Button>
          </div>
        )}

        {activeField.type === 'lookup' && (
          <div className="space-y-4 border rounded-md p-3 bg-slate-50">
            <h4 className="font-medium text-sm text-primary">Configuração de Busca (Lookup)</h4>

            <div className="space-y-2">
              <Label>Origem dos Dados</Label>
              <Select
                value={activeField.dataSourceType || 'master_data'}
                onValueChange={(val: 'internal' | 'external_api' | 'master_data') => {
                  const updates: Partial<FormField> = { dataSourceType: val }
                  if (val === 'master_data') {
                    updates.settings = { ...activeField.settings, source: 'master_data' }
                  }
                  handleUpdateField(activeField.id, updates)
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="master_data">Dados Mestre</SelectItem>
                  <SelectItem value="internal">Banco de Dados Interno</SelectItem>
                  <SelectItem value="external_api">API Externa (Ex: Receita, Correios)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(!activeField.dataSourceType || activeField.dataSourceType === 'master_data') && (
              <div className="space-y-2">
                <Label>Tipo de Entidade Restrita</Label>
                {loadingEntities ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={
                      activeField.settings?.entitySlug || activeField.lookupEntitySlug || 'any'
                    }
                    onValueChange={(val) => {
                      const slug = val === 'any' ? undefined : val
                      handleUpdateField(activeField.id, {
                        lookupEntitySlug: slug,
                        settings: {
                          ...activeField.settings,
                          entitySlug: slug,
                          source: 'master_data',
                        },
                      })
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Qualquer (Usuário escolhe na hora)</SelectItem>
                      {masterEntities.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          Nenhuma entidade definida
                        </SelectItem>
                      ) : (
                        masterEntities.map((def) => (
                          <SelectItem key={def.slug} value={def.slug}>
                            {def.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {activeField.dataSourceType === 'internal' && (
              <div className="space-y-2">
                <Label>Tabela Interna (Legado)</Label>
                <Select
                  value={activeField.lookupSource || 'any'}
                  onValueChange={(val) =>
                    handleUpdateField(activeField.id, {
                      lookupSource: val === 'any' ? undefined : val,
                    })
                  }
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    {entityDefs.map((def) => (
                      <SelectItem key={def.id} value={def.id}>
                        {def.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeField.dataSourceType === 'external_api' && (
              <>
                <div className="space-y-2">
                  <Label>URL do Endpoint (API)</Label>
                  <Input
                    className="bg-white"
                    placeholder="https://api.exemplo.com/dados?q={query}"
                    value={activeField.apiUrl || ''}
                    onChange={(e) => handleUpdateField(activeField.id, { apiUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use <code>{'{query}'}</code> para injetar o texto digitado pelo usuário.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Mapeamento do JSON (Caminho para o Array)</Label>
                  <Input
                    className="bg-white"
                    placeholder="Ex: data.results"
                    value={activeField.apiMapping || ''}
                    onChange={(e) =>
                      handleUpdateField(activeField.id, { apiMapping: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Deixe em branco se a API retornar um Array diretamente.
                  </p>
                </div>
              </>
            )}
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
