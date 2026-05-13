import { FormField, FormBlock, ActiveItem, FieldType } from '@/types'
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
import { useState, useEffect, useRef } from 'react'
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
  hasResponses?: boolean
}

export function PropertiesPanel({
  activeItem,
  fields,
  blocks,
  handleUpdateField,
  handleUpdateBlock,
  hasResponses,
}: Props) {
  const { entityDefs } = useAppStore()
  const [masterEntities, setMasterEntities] = useState<any[]>([])
  const [loadingEntities, setLoadingEntities] = useState(false)
  const [tab, setTab] = useState<'geral' | 'logica'>('geral')
  const [users, setUsers] = useState<any[]>([])

  const [calcField1, setCalcField1] = useState('')
  const [calcOp, setCalcOp] = useState('+')
  const [calcField2, setCalcField2] = useState('')

  const activeField =
    activeItem?.type === 'field' ? fields.find((f) => f.id === activeItem.id) : undefined

  const labelInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeField?.id && tab === 'geral') {
      const timer = setTimeout(() => {
        if (labelInputRef.current) {
          labelInputRef.current.focus()
          labelInputRef.current.select()
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [activeField?.id, tab])

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
            <div className="flex items-center justify-between p-4 border rounded-md bg-slate-50 shadow-sm mb-4">
              <div>
                <h4 className="font-medium text-sm text-primary">Campo Ativo</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Desativar oculta o campo no preenchimento.
                </p>
              </div>
              <Switch
                checked={!activeField.disabled}
                onCheckedChange={(c) => handleUpdateField(activeField.id, { disabled: !c })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo do Campo</Label>
              <Select
                value={activeField.type}
                disabled={hasResponses}
                onValueChange={(val) =>
                  handleUpdateField(activeField.id, { type: val as FieldType })
                }
              >
                <SelectTrigger className={`bg-white ${hasResponses ? 'opacity-70' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto Curto</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="radio">Múltipla Escolha (Única)</SelectItem>
                  <SelectItem value="checkbox">Caixas de Seleção (Múltipla)</SelectItem>
                  <SelectItem value="gps">Localização (GPS)</SelectItem>
                  <SelectItem value="camera">Foto / Câmera</SelectItem>
                  <SelectItem value="signature">Assinatura</SelectItem>
                  <SelectItem value="calculation">Cálculo</SelectItem>
                  <SelectItem value="lookup">Busca (Lookup)</SelectItem>
                </SelectContent>
              </Select>
              {hasResponses && (
                <p className="text-[11px] text-amber-600 font-medium leading-tight">
                  Este campo já possui dados coletados e seu tipo não pode ser alterado para evitar
                  inconsistência.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Rótulo do Campo (Label)</Label>
              <Input
                ref={labelInputRef}
                key={`label-${activeField.id}`}
                autoFocus
                placeholder="Digite o nome do campo..."
                value={activeField.label ?? ''}
                onChange={(e) => handleUpdateField(activeField.id, { label: e.target.value })}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label>Instruções / Dica</Label>
              <Input
                key={`inst-${activeField.id}`}
                placeholder="Ex: Descreva o procedimento..."
                value={(activeField as any).instructions ?? ''}
                onChange={(e) =>
                  handleUpdateField(activeField.id, { instructions: e.target.value } as any)
                }
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fórmula de Expressão (Preview)</Label>
                    <div className="p-3 bg-white border rounded-md font-mono text-sm break-all text-slate-700 min-h-[42px] flex items-center">
                      {activeField.formula ? (
                        <span>
                          Resultado ={' '}
                          {activeField.formula.replace(/\[([^\]]+)\]/g, (match) => {
                            const id = match.slice(1, -1)
                            const field = fields.find((f) => f.id === id)
                            return field ? `[${field.label}]` : match
                          })}
                        </span>
                      ) : (
                        <span className="text-slate-400">Nenhuma fórmula definida</span>
                      )}
                    </div>
                    {activeField.formula && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateField(activeField.id, { formula: '' })}
                        className="mt-2"
                      >
                        Limpar Fórmula
                      </Button>
                    )}
                  </div>

                  <div className="p-3 border rounded-md bg-white space-y-3 shadow-sm">
                    <Label className="text-xs font-semibold text-slate-500 uppercase">
                      Construtor de Partes
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Campo 1</Label>
                        <Select value={calcField1} onValueChange={setCalcField1}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {fields
                              .filter(
                                (f) =>
                                  (f.type === 'number' || f.type === 'calculation') &&
                                  f.id !== activeField.id,
                              )
                              .map((f) => (
                                <SelectItem key={f.id} value={f.id}>
                                  {f.label || 'Sem Nome'}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Operação</Label>
                        <Select value={calcOp} onValueChange={setCalcOp}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Op" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+">+ (Soma)</SelectItem>
                            <SelectItem value="-">- (Subtração)</SelectItem>
                            <SelectItem value="*">x (Multiplicação)</SelectItem>
                            <SelectItem value="/">/ (Divisão)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Campo 2</Label>
                        <Select value={calcField2} onValueChange={setCalcField2}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {fields
                              .filter(
                                (f) =>
                                  (f.type === 'number' || f.type === 'calculation') &&
                                  f.id !== activeField.id,
                              )
                              .map((f) => (
                                <SelectItem key={f.id} value={f.id}>
                                  {f.label || 'Sem Nome'}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full h-8 mt-1"
                      disabled={!calcField1 || !calcOp || !calcField2}
                      onClick={() => {
                        const addition = `[${calcField1}] ${calcOp} [${calcField2}]`
                        const current = activeField.formula || ''
                        handleUpdateField(activeField.id, {
                          formula: current ? `${current} + ${addition}` : addition,
                        })
                        setCalcField1('')
                        setCalcField2('')
                        setCalcOp('+')
                      }}
                    >
                      Adicionar à Fórmula
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t mt-4">
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
          </div>
        )}

        {tab === 'logica' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-4 border rounded-md bg-slate-50 shadow-sm mb-4">
              <div>
                <h4 className="font-medium text-sm text-primary">Sempre Visível</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Exibir este campo incondicionalmente.
                </p>
              </div>
              <Switch
                checked={activeField.alwaysVisible !== false}
                onCheckedChange={(c) => handleUpdateField(activeField.id, { alwaysVisible: c })}
              />
            </div>

            {activeField.alwaysVisible !== false ? (
              <div className="p-6 bg-blue-50 text-blue-800 rounded-md text-sm font-medium text-center border border-blue-100 flex flex-col items-center gap-4">
                <span>Este campo será exibido incondicionalmente.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateField(activeField.id, { alwaysVisible: false })}
                >
                  Configurar Regras e Visibilidade
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm text-primary">Regras e Ações Automáticas</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => {
                      const newRule = {
                        id: Math.random().toString(36).substr(2, 9),
                        sourceFieldId: '',
                        condition: 'eq' as any,
                        targetValue: '',
                        value: '',
                        action: 'SET_VISIBLE' as any,
                        targetId: activeField.id,
                      }
                      handleUpdateField(activeField.id, {
                        logicRules: [...(activeField.logicRules || []), newRule],
                        alwaysVisible: false,
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
                      const isVisibilityAction = ['SET_VISIBLE', 'SET_HIDDEN'].includes(
                        newRules[idx].action,
                      )
                      handleUpdateField(activeField.id, {
                        logicRules: newRules,
                        ...(isVisibilityAction ? { alwaysVisible: false } : {}),
                      })
                    }

                    const isTargetBased = ['SET_VISIBLE', 'SET_HIDDEN'].includes(rule.action)
                    const isSourceBased = [
                      'SHOW_FIELD',
                      'HIDE_FIELD',
                      'SET_REQUIRED',
                      'REQUIRE_PHOTO',
                      'REQUIRE_ATTACHMENT',
                      'DISPLAY_ALERT',
                      'BLOCK_SUBMIT',
                      'CREATE_ACTION_PLAN',
                      'ESCALATE_APPROVAL',
                    ].includes(rule.action)

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
                              {isTargetBased
                                ? 'Se a resposta da referência for'
                                : 'Se a resposta for'}
                            </Label>
                            <Select
                              value={
                                [
                                  'equals',
                                  'not_equals',
                                  'greater_than',
                                  'less_than',
                                  'greater_than_or_equal',
                                  'less_than_or_equal',
                                ].includes(rule.condition as string)
                                  ? rule.condition === 'equals'
                                    ? 'eq'
                                    : rule.condition === 'not_equals'
                                      ? 'neq'
                                      : rule.condition === 'greater_than'
                                        ? 'gt'
                                        : rule.condition === 'less_than'
                                          ? 'lt'
                                          : rule.condition === 'greater_than_or_equal'
                                            ? 'gte'
                                            : 'lte'
                                  : rule.condition || 'eq'
                              }
                              onValueChange={(v) => updateRule({ condition: v })}
                            >
                              <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="eq">Igual a</SelectItem>
                                <SelectItem value="neq">Diferente de</SelectItem>
                                <SelectItem value="gt">Maior que</SelectItem>
                                <SelectItem value="lt">Menor que</SelectItem>
                                <SelectItem value="gte">Maior ou igual a</SelectItem>
                                <SelectItem value="lte">Menor ou igual a</SelectItem>
                                {rule.condition &&
                                  ![
                                    'eq',
                                    'neq',
                                    'gt',
                                    'lt',
                                    'gte',
                                    'lte',
                                    'equals',
                                    'not_equals',
                                    'greater_than',
                                    'less_than',
                                    'greater_than_or_equal',
                                    'less_than_or_equal',
                                  ].includes(rule.condition) && (
                                    <SelectItem value={rule.condition}>{rule.condition}</SelectItem>
                                  )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-slate-500">Valor</Label>
                            <Input
                              className="h-8 bg-white text-xs shadow-sm"
                              value={
                                rule.targetValue !== undefined ? rule.targetValue : rule.value || ''
                              }
                              onChange={(e) =>
                                updateRule({ targetValue: e.target.value, value: e.target.value })
                              }
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
                            onValueChange={(v) => {
                              const updates: any = { action: v, message: '', responsibleId: '' }
                              if (['SET_VISIBLE', 'SET_HIDDEN'].includes(v)) {
                                updates.targetId = activeField.id
                                updates.sourceFieldId = rule.sourceFieldId || ''
                              } else {
                                updates.sourceFieldId = activeField.id
                                updates.targetId = ''
                              }
                              updateRule(updates)
                            }}
                          >
                            <SelectTrigger className="h-8 bg-white text-xs shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SHOW_FIELD">Mostrar outro campo (Push)</SelectItem>
                              <SelectItem value="HIDE_FIELD">Ocultar outro campo (Push)</SelectItem>
                              <SelectItem value="SET_VISIBLE">
                                Tornar este campo visível (Pull)
                              </SelectItem>
                              <SelectItem value="SET_HIDDEN">Ocultar este campo (Pull)</SelectItem>
                              <SelectItem value="SET_REQUIRED">Tornar campo obrigatório</SelectItem>
                              <SelectItem value="REQUIRE_PHOTO">Exigir Foto</SelectItem>
                              <SelectItem value="REQUIRE_ATTACHMENT">Exigir Anexo</SelectItem>
                              <SelectItem value="DISPLAY_ALERT">Exibir Alerta Visual</SelectItem>
                              <SelectItem value="BLOCK_SUBMIT">Bloquear Submissão</SelectItem>
                              <SelectItem value="CREATE_ACTION_PLAN">
                                Criar Plano de Ação
                              </SelectItem>
                              <SelectItem value="ESCALATE_APPROVAL">
                                Sinalizar Revisão / Escalar
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {isSourceBased &&
                          [
                            'SHOW_FIELD',
                            'HIDE_FIELD',
                            'SET_REQUIRED',
                            'REQUIRE_PHOTO',
                            'REQUIRE_ATTACHMENT',
                          ].includes(rule.action) && (
                            <div className="space-y-1.5">
                              <Label className="text-xs font-semibold text-slate-500">
                                Campo Alvo
                              </Label>
                              <Select
                                value={rule.targetId || ''}
                                onValueChange={(v) => {
                                  updateRule({ targetId: v })
                                  if (['SHOW_FIELD', 'HIDE_FIELD'].includes(rule.action) && v) {
                                    handleUpdateField(v, { alwaysVisible: false })
                                  }
                                }}
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

                        {isTargetBased && (
                          <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-slate-500">
                              Campo de Referência (Pull)
                            </Label>
                            <Select
                              value={rule.sourceFieldId || ''}
                              onValueChange={(v) => updateRule({ sourceFieldId: v })}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
