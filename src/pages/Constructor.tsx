import { useState, useEffect } from 'react'
import { generateId } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { FormField, FieldType, Template } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { Toolbox } from '@/components/constructor/Toolbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Save, GripVertical, Trash2, Plus, CornerDownRight, FileText } from 'lucide-react'

export default function Constructor() {
  const { templates, addTemplate, updateTemplate } = useAppStore()
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [templateName, setTemplateName] = useState('Novo Checklist')
  const [fields, setFields] = useState<FormField[]>([])
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('toolbox')

  useEffect(() => {
    if (
      !editingTemplateId &&
      templates.length > 0 &&
      fields.length === 0 &&
      templateName === 'Novo Checklist'
    ) {
      loadTemplate(templates[0])
    }
  }, [templates, editingTemplateId, fields.length, templateName])

  const loadTemplate = (t: Template) => {
    setEditingTemplateId(t.id)
    setTemplateName(t.name)
    setFields(t.fields)
    setActiveFieldId(null)
    setActiveTab('toolbox')
  }

  const createNewTemplate = () => {
    setEditingTemplateId(null)
    setTemplateName('Novo Checklist')
    setFields([])
    setActiveFieldId(null)
    setActiveTab('toolbox')
  }

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `field_${generateId().substring(0, 6)}`,
      type,
      label: `Novo Campo (${type})`,
      required: false,
    }
    setFields([...fields, newField])
    setActiveFieldId(newField.id)
    setActiveTab('properties')
  }

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
    if (activeFieldId === id) {
      setActiveFieldId(null)
      setActiveTab('toolbox')
    }
  }

  const handleSave = () => {
    if (!templateName || fields.length === 0) {
      toast({
        title: 'Erro',
        description: 'Adicione um nome e pelo menos um campo.',
        variant: 'destructive',
      })
      return
    }

    if (editingTemplateId) {
      updateTemplate({
        ...templates.find((t) => t.id === editingTemplateId)!,
        name: templateName,
        fields,
      })
      toast({ title: 'Sucesso', description: 'Template atualizado com sucesso!' })
    } else {
      const newTemplate: Template = {
        id: `tmpl_${generateId()}`,
        name: templateName,
        description: 'Template gerado pelo construtor.',
        createdAt: new Date().toISOString(),
        fields,
      }
      addTemplate(newTemplate)
      setEditingTemplateId(newTemplate.id)
      toast({ title: 'Sucesso', description: 'Novo template salvo com sucesso!' })
    }
  }

  const getDepth = (fieldId: string) => {
    let depth = 0
    let currentId = fieldId
    const visited = new Set<string>()

    while (currentId) {
      if (visited.has(currentId)) break
      visited.add(currentId)

      const current = fields.find((f) => f.id === currentId)
      if (!current) break

      currentId = current.logicDependsOn || current.repeatsBasedOn || ''
      if (currentId) depth++
    }
    return depth
  }

  const activeField = fields.find((f) => f.id === activeFieldId)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
      <div className="w-64 bg-card border rounded-lg p-4 flex flex-col gap-4 shadow-sm overflow-hidden shrink-0 hidden md:flex">
        <Button onClick={createNewTemplate} className="w-full gap-2 shrink-0">
          <Plus className="h-4 w-4" /> Novo Checklist
        </Button>
        <div className="font-semibold text-sm text-muted-foreground mt-2 shrink-0">
          Meus Checklists
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 -mr-2 pr-2">
          {templates.map((t) => (
            <Card
              key={t.id}
              className={`p-3 cursor-pointer hover:border-primary transition-colors ${editingTemplateId === t.id ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => loadTemplate(t)}
            >
              <div className="font-medium text-sm truncate flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{t.name}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 ml-6">
                {t.fields.length} campos
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden bg-muted/30 p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center bg-card p-3 rounded-md shadow-sm border shrink-0">
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="max-w-xs font-semibold text-lg border-none shadow-none focus-visible:ring-0"
          />
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar {editingTemplateId ? 'Alterações' : 'Template'}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 p-1">
          {fields.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Arraste ou clique nos componentes ao lado para começar
            </div>
          ) : (
            fields.map((f) => {
              const depth = getDepth(f.id)
              return (
                <div
                  key={f.id}
                  className="relative flex items-center transition-all"
                  style={{ marginLeft: `${depth * 1.5}rem` }}
                >
                  {depth > 0 && (
                    <CornerDownRight className="absolute -left-6 top-4 h-5 w-5 text-muted-foreground opacity-50" />
                  )}
                  <Card
                    className={`flex-1 p-4 cursor-pointer transition-all ${activeFieldId === f.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`}
                    onClick={() => {
                      setActiveFieldId(f.id)
                      setActiveTab('properties')
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-move shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium flex items-center gap-2 truncate">
                          <span className="truncate">{f.label}</span>
                          {f.required && <span className="text-destructive shrink-0">*</span>}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                          {f.type}
                        </div>
                        {f.logicDependsOn && (
                          <div className="text-xs bg-blue-100 text-blue-800 p-1 mt-2 rounded inline-block truncate max-w-full">
                            Lógica: Mostrar se {f.logicDependsOn} = {f.logicValue}
                          </div>
                        )}
                        {f.repeatsBasedOn && (
                          <div className="text-xs bg-purple-100 text-purple-800 p-1 mt-2 rounded inline-block truncate max-w-full mt-2 ml-2">
                            Repetir X vezes (base: {f.repeatsBasedOn})
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveField(f.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="w-80 bg-card border rounded-lg p-4 overflow-hidden shadow-sm flex flex-col shrink-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full grid grid-cols-2 shrink-0">
            <TabsTrigger value="toolbox">Componentes</TabsTrigger>
            <TabsTrigger value="properties" disabled={!activeFieldId}>
              Propriedades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="toolbox" className="flex-1 overflow-y-auto mt-4 pr-2">
            <Toolbox onAdd={handleAddField} />
          </TabsContent>

          <TabsContent value="properties" className="flex-1 overflow-y-auto mt-4 pr-2">
            {!activeField ? (
              <p className="text-sm text-muted-foreground">
                Selecione um campo no centro para editar.
              </p>
            ) : (
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
                        onChange={(e) =>
                          handleUpdateField(activeField.id, { options: e.target.value })
                        }
                        placeholder="Ex: Sim, Não, N/A"
                      />
                    </div>
                  )}

                  {activeField.type === 'calculation' && (
                    <div className="space-y-2">
                      <Label>Fórmula</Label>
                      <Input
                        value={activeField.calculation || ''}
                        onChange={(e) =>
                          handleUpdateField(activeField.id, { calculation: e.target.value })
                        }
                        placeholder="Ex: {{field_1}} * 2"
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use os IDs dos campos entre chaves.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium text-sm text-primary">
                    Lógica de Visibilidade (Árvore)
                  </h4>
                  <div className="space-y-2">
                    <Label>Depende do campo (ID)</Label>
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
                  {activeField.logicDependsOn && (
                    <div className="space-y-2 animate-in slide-down">
                      <Label>Mostrar quando o valor for:</Label>
                      <Input
                        value={activeField.logicValue || ''}
                        onChange={(e) =>
                          handleUpdateField(activeField.id, { logicValue: e.target.value })
                        }
                        placeholder="Ex: Sim"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium text-sm text-primary">
                    Lógica Quantitativa (Repetidor)
                  </h4>
                  <div className="space-y-2">
                    <Label>Repetir com base no campo (Número)</Label>
                    <Select
                      value={activeField.repeatsBasedOn || 'none'}
                      onValueChange={(val) =>
                        handleUpdateField(activeField.id, {
                          repeatsBasedOn: val === 'none' ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um campo numérico..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Não repetir</SelectItem>
                        {fields
                          .filter((f) => f.id !== activeField.id && f.type === 'number')
                          .map((f) => (
                            <SelectItem key={f.id} value={f.id}>
                              {f.label} ({f.id})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {activeField.repeatsBasedOn && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Este componente será gerado X vezes, onde X é o valor preenchido no campo
                      selecionado.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                    ID: {activeField.id}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
