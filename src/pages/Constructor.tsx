import { useState, useEffect } from 'react'
import { generateId } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { FormField, FieldType, Template } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Toolbox } from '@/components/constructor/Toolbox'
import { PropertiesPanel } from '@/components/constructor/PropertiesPanel'
import { ConfigPanel } from '@/components/constructor/ConfigPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, GripVertical, Trash2, Plus, FileText, ShieldAlert } from 'lucide-react'

export default function Constructor() {
  const { templates, addTemplate, updateTemplate, currentUser } = useAppStore()
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [templateName, setTemplateName] = useState('Novo Checklist')
  const [fields, setFields] = useState<FormField[]>([])
  const [assignedUsers, setAssignedUsers] = useState<string[]>([])
  const [assignedDepartments, setAssignedDepartments] = useState<string[]>([])
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

  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-4">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <p>Acesso negado. Apenas administradores podem acessar o Construtor.</p>
      </div>
    )
  }

  const loadTemplate = (t: Template) => {
    setEditingTemplateId(t.id)
    setTemplateName(t.name)
    setFields(t.fields)
    setAssignedUsers(t.assignedUsers || [])
    setAssignedDepartments(t.assignedDepartments || [])
    setActiveFieldId(null)
    setActiveTab('toolbox')
  }

  const createNewTemplate = () => {
    setEditingTemplateId(null)
    setTemplateName('Novo Checklist')
    setFields([])
    setAssignedUsers([])
    setAssignedDepartments([])
    setActiveFieldId(null)
    setActiveTab('toolbox')
  }

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `f_${generateId().substring(0, 6)}`,
      type,
      label: `Novo Campo (${type})`,
      required: false,
    }
    setFields([...fields, newField])
    setActiveFieldId(newField.id)
    setActiveTab('properties')
  }

  const handleSave = () => {
    if (!templateName || fields.length === 0)
      return toast({
        title: 'Erro',
        description: 'Adicione um nome e pelo menos um campo.',
        variant: 'destructive',
      })
    const tmplData = { name: templateName, fields, assignedUsers, assignedDepartments }
    if (editingTemplateId) {
      updateTemplate({ ...templates.find((t) => t.id === editingTemplateId)!, ...tmplData })
      toast({ title: 'Sucesso', description: 'Template atualizado!' })
    } else {
      const newTemplate: Template = {
        id: `tmpl_${generateId()}`,
        description: 'Gerado pelo construtor.',
        createdAt: new Date().toISOString(),
        ...tmplData,
      }
      addTemplate(newTemplate)
      setEditingTemplateId(newTemplate.id)
      toast({ title: 'Sucesso', description: 'Novo template salvo!' })
    }
  }

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
              className={`p-3 cursor-pointer hover:border-primary ${editingTemplateId === t.id ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => loadTemplate(t)}
            >
              <div className="font-medium text-sm truncate flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{t.name}</span>
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
          {fields.map((f) => (
            <Card
              key={f.id}
              className={`p-4 cursor-pointer transition-all ${activeFieldId === f.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`}
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
                    {f.hardValidation && (
                      <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">
                        HARD LOCK
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {f.type}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFields(fields.filter((x) => x.id !== f.id))
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-80 bg-card border rounded-lg p-4 overflow-hidden shadow-sm flex flex-col shrink-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full grid grid-cols-3 shrink-0 h-12">
            <TabsTrigger value="toolbox" className="text-xs px-1">
              Comps
            </TabsTrigger>
            <TabsTrigger value="properties" disabled={!activeFieldId} className="text-xs px-1">
              Props
            </TabsTrigger>
            <TabsTrigger value="config" className="text-xs px-1">
              Config
            </TabsTrigger>
          </TabsList>
          <TabsContent value="toolbox" className="flex-1 overflow-y-auto mt-4 pr-2">
            <Toolbox onAdd={handleAddField} />
          </TabsContent>
          <TabsContent value="properties" className="flex-1 overflow-y-auto mt-4 pr-2">
            {activeFieldId ? (
              <PropertiesPanel
                activeField={fields.find((f) => f.id === activeFieldId)!}
                fields={fields}
                handleUpdateField={(id, up) =>
                  setFields(fields.map((f) => (f.id === id ? { ...f, ...up } : f)))
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">Selecione um campo.</p>
            )}
          </TabsContent>
          <TabsContent value="config" className="flex-1 overflow-y-auto mt-4 pr-2">
            <ConfigPanel
              assignedUsers={assignedUsers}
              assignedDepartments={assignedDepartments}
              onChange={(u, d) => {
                setAssignedUsers(u)
                setAssignedDepartments(d)
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
