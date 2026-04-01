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
import { UNITS } from '@/lib/utils/conversions'

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
  const [tab, setTab] = useState<'geral' | 'logica'>('geral')
  const [users, setUsers] = useState<any[]>([])

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

  useEffect(() => {
    pb.collection('users').getFullList().then(setUsers).catch(console.error)
  }, [])

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
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setTab('geral')}
          className={`pb-2 border-b-2 text-sm font-medium transition-colors ${tab === 'geral' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Geral
        </button>
        <button
          onClick={() => setTab('logica')}
          className={`pb-2 border-b-2 text-sm font-medium transition-colors ${tab === 'logica' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Gatilhos & Lógica
        </button>
      </div>

      <div className="space-y-4">
        {tab === 'geral' && (
          <div className="space-y-4 animate-in fade-in duration-200">
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
                  {(typeof activeField.options === 'string'
                    ? activeField.options.split(',')
                    : []
                  ).map((opt, idx) => (
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
                            options:
                              currentOptions.length > 0 ? currentOptions.join(',') : undefined,
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
                            options:
                              currentOptions.length > 0 ? currentOptions.join(',') : undefined,
                          })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
                      <SelectItem value="external_api">
                        API Externa (Ex: Receita, Correios)
                      </SelectItem>
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
                        onChange={(e) =>
                          handleUpdateField(activeField.id, { apiUrl: e.target.value })
                        }
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

            {activeField.type === 'calculation' && (
              <div className="space-y-4 border rounded-md p-4 bg-slate-50/50 shadow-sm">
                <h4 className="font-medium text-sm text-primary">Engenharia de Cálculo</h4>

                <div className="space-y-2">
                  <Label>Fórmula de Expressão</Label>
                  <Input
                    className="bg-white font-mono text-sm"
                    placeholder="Ex: [field_id_1] * [field_id_2]"
                    value={activeField.formula || ''}
                    onChange={(e) => handleUpdateField(activeField.id, { formula: e.target.value })}
                  />
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">Variáveis Numéricas Disponíveis (Clique para copiar):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fields
                        .filter(
                          (f) =>
                            (f.type === 'number' || f.type === 'calculation') &&
                            f.id !== activeField.id,
                        )
                        .map((f) => (
                          <span
                            key={f.id}
                            className="bg-primary/10 text-primary px-1.5 py-0.5 rounded cursor-pointer hover:bg-primary/20 transition-colors"
                            title={`Label: ${f.label}`}
                            onClick={() => {
                              navigator.clipboard.writeText(`[${f.id}]`)
                            }}
                          >
                            [{f.id}]
                          </span>
                        ))}
                      {fields.filter(
                        (f) =>
                          (f.type === 'number' || f.type === 'calculation') &&
                          f.id !== activeField.id,
                      ).length === 0 && (
                        <span className="text-slate-400 italic">
                          Nenhum campo numérico criado ainda.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <Label>Categoria de Conversão de Unidade</Label>
                  <Select
                    value={activeField.unit_category || 'none'}
                    onValueChange={(val: any) =>
                      handleUpdateField(activeField.id, {
                        unit_category: val === 'none' ? undefined : val,
                        unit_source: undefined,
                        unit_target: undefined,
                      })
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Sem conversão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem conversão</SelectItem>
                      <SelectItem value="mass">Massa / Peso</SelectItem>
                      <SelectItem value="length">Comprimento / Distância</SelectItem>
                      <SelectItem value="temp">Temperatura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {activeField.unit_category && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Unidade de Entrada</Label>
                      <Select
                        value={activeField.unit_source || ''}
                        onValueChange={(val) =>
                          handleUpdateField(activeField.id, { unit_source: val })
                        }
                      >
                        <SelectTrigger className="bg-white h-9 text-xs">
                          <SelectValue placeholder="Origem" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNITS[activeField.unit_category as keyof typeof UNITS]?.map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Unidade de Saída (Exibição)</Label>
                      <Select
                        value={activeField.unit_target || ''}
                        onValueChange={(val) =>
                          handleUpdateField(activeField.id, { unit_target: val })
                        }
                      >
                        <SelectTrigger className="bg-white h-9 text-xs">
                          <SelectValue placeholder="Destino" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNITS[activeField.unit_category as keyof typeof UNITS]?.map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                    onChange={(e) =>
                      handleUpdateField(activeField.id, { logicValue: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'logica' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-sm text-primary">Regras e Ações Automáticas</h4>
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => {
                  const newRule = {
                    id: Math.random().toString(36).substr(2, 9),
                    sourceFieldId: activeField.id,
                    condition: 'equals' as any,
                    value: '',
                    action: 'SHOW_FIELD' as any,
                  }
                  handleUpdateField(activeField.id, {
                    logicRules: [...(activeField.logicRules || []), newRule],
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Nova Regra
              </Button>
            </div>

            {(!activeField.logicRules || activeField.logicRules.length === 0) && (
              <div className="text-center p-6 border border-dashed rounded-lg bg-slate-50">
                <p className="text-sm text-muted-foreground">
                  Nenhum gatilho definido para este campo.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {activeField.logicRules?.map((rule, idx) => {
                const updateRule = (updates: any) => {
                  const newRules = [...(activeField.logicRules || [])]
                  newRules[idx] = { ...rule, ...updates }
                  handleUpdateField(activeField.id, { logicRules: newRules })
                }

                return (
                  <div
                    key={rule.id}
                    className="border border-slate-200 p-4 rounded-md space-y-4 bg-slate-50 relative shadow-sm"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        const newRules = [...(activeField.logicRules || [])]
                        newRules.splice(idx, 1)
                        handleUpdateField(activeField.id, { logicRules: newRules })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-2 gap-3 pr-8">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-500">
                          Se a resposta for
                        </Label>
                        <Select
                          value={rule.condition}
                          onValueChange={(v) => updateRule({ condition: v })}
                        >
                          <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Igual a</SelectItem>
                            <SelectItem value="not_equals">Diferente de</SelectItem>
                            <SelectItem value="greater_than">Maior que</SelectItem>
                            <SelectItem value="less_than">Menor que</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-500">Valor</Label>
                        <Input
                          className="h-8 bg-white text-xs shadow-sm"
                          value={rule.value || ''}
                          onChange={(e) => updateRule({ value: e.target.value })}
                          placeholder="Ex: Sim"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <Label className="text-xs font-semibold text-slate-500">
                        Executar a ação
                      </Label>
                      <Select
                        value={rule.action}
                        onValueChange={(v) =>
                          updateRule({ action: v, targetId: '', message: '', responsibleId: '' })
                        }
                      >
                        <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SHOW_FIELD">Mostrar outro campo</SelectItem>
                          <SelectItem value="HIDE_FIELD">Ocultar outro campo</SelectItem>
                          <SelectItem value="SET_REQUIRED">Tornar campo obrigatório</SelectItem>
                          <SelectItem value="DISPLAY_ALERT">Exibir Alerta Visual</SelectItem>
                          <SelectItem value="BLOCK_SUBMIT">Bloquear Submissão</SelectItem>
                          <SelectItem value="CREATE_ACTION_PLAN">Criar Plano de Ação</SelectItem>
                          <SelectItem value="ESCALATE_APPROVAL">
                            Sinalizar Revisão / Escalar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {['SHOW_FIELD', 'HIDE_FIELD', 'SET_REQUIRED'].includes(rule.action) && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-500">Campo Alvo</Label>
                        <Select
                          value={rule.targetId || ''}
                          onValueChange={(v) => updateRule({ targetId: v })}
                        >
                          <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                            <SelectValue placeholder="Selecione o campo..." />
                          </SelectTrigger>
                          <SelectContent>
                            {fields
                              .filter((f) => f.id !== activeField.id)
                              .map((f) => (
                                <SelectItem key={f.id} value={f.id}>
                                  {f.label || 'Sem label'}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {['DISPLAY_ALERT', 'BLOCK_SUBMIT'].includes(rule.action) && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-500">
                          Mensagem para o Operador
                        </Label>
                        <Input
                          className="h-8 bg-white text-xs shadow-sm"
                          value={rule.message || ''}
                          onChange={(e) => updateRule({ message: e.target.value })}
                          placeholder="Ex: Tire uma foto da avaria imediatamente."
                        />
                      </div>
                    )}

                    {['CREATE_ACTION_PLAN', 'ESCALATE_APPROVAL'].includes(rule.action) && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-500">
                          Usuário Responsável
                        </Label>
                        <Select
                          value={rule.responsibleId || ''}
                          onValueChange={(v) => updateRule({ responsibleId: v })}
                        >
                          <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                            <SelectValue placeholder="Selecione o usuário..." />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((u) => (
                              <SelectItem key={u.id} value={u.id}>
                                {u.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
