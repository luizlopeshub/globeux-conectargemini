import { useState, useEffect } from 'react'
import { generateId } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { FormField, FormBlock, FieldType, Template, ActiveItem, Subject } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { Toolbox } from '@/components/constructor/Toolbox'
import { SubjectSelect } from '@/components/SubjectSelect'
import { getSubjects } from '@/services/subjects'
import { PropertiesPanel } from '@/components/constructor/PropertiesPanel'
import { ConfigPanel } from '@/components/constructor/ConfigPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Save,
  GripVertical,
  Trash2,
  Plus,
  FileText,
  ShieldAlert,
  Layers,
  ChevronUp,
  ChevronDown,
  Paperclip,
  X,
} from 'lucide-react'

export default function Constructor() {
  const { templates, addTemplate, updateTemplate, currentUser } = useAppStore()
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)

  const [templateName, setTemplateName] = useState('Novo Checklist')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])

  const [blocks, setBlocks] = useState<FormBlock[]>([])
  const [fields, setFields] = useState<FormField[]>([])
  const [assignedUsers, setAssignedUsers] = useState<string[]>([])
  const [assignedDepartments, setAssignedDepartments] = useState<string[]>([])

  const [activeItem, setActiveItem] = useState<ActiveItem>(null)
  const [activeTab, setActiveTab] = useState('toolbox')
  const [mainTab, setMainTab] = useState('canvas')

  const [subjectsList, setSubjectsList] = useState<Subject[]>([])

  useEffect(() => {
    getSubjects().then(setSubjectsList).catch(console.error)
  }, [])

  useEffect(() => {
    if (!editingTemplateId && templates.length > 0 && fields.length === 0) {
      loadTemplate(templates[0])
    }
  }, [templates, editingTemplateId, fields.length])

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
    setSubject(t.subject || '')
    setDescription(t.description || '')
    setAttachments(t.attachments || [])

    let loadedBlocks = t.blocks || []
    let loadedFields = t.fields || []
    if (loadedBlocks.length === 0) {
      loadedBlocks = [{ id: `b_${generateId()}`, name: 'Bloco 1: Principal' }]
      loadedFields = loadedFields.map((f) => ({ ...f, blockId: loadedBlocks[0].id }))
    }
    setBlocks(loadedBlocks)
    setFields(loadedFields)
    setAssignedUsers(t.assignedUsers || [])
    setAssignedDepartments(t.assignedDepartments || [])
    setActiveItem(null)
    setActiveTab('toolbox')
    setMainTab('canvas')
  }

  const createNewTemplate = () => {
    setEditingTemplateId(null)
    setTemplateName('Novo Checklist')
    setSubject('')
    setDescription('')
    setAttachments([])
    setBlocks([{ id: `b_${generateId()}`, name: 'Bloco 1: Cadastro' }])
    setFields([])
    setActiveItem(null)
    setActiveTab('toolbox')
    setMainTab('canvas')
  }

  const handleAddBlock = () => {
    const newBlock: FormBlock = {
      id: `b_${generateId().substring(0, 6)}`,
      name: `Novo Bloco ${blocks.length + 1}`,
    }
    setBlocks([...blocks, newBlock])
    setActiveItem({ id: newBlock.id, type: 'block' })
    setActiveTab('properties')
  }

  const handleAddField = (type: FieldType) => {
    const targetBlockId =
      activeItem?.type === 'block' ? activeItem.id : blocks[0]?.id || `b_${generateId()}`
    if (blocks.length === 0) setBlocks([{ id: targetBlockId, name: 'Bloco 1' }])

    const newField: FormField = {
      id: `f_${generateId().substring(0, 6)}`,
      blockId: targetBlockId,
      type,
      label: `Novo Campo (${type})`,
      required: false,
    }
    setFields([...fields, newField])
    setActiveItem({ id: newField.id, type: 'field' })
    setActiveTab('properties')
  }

  const handleSave = () => {
    if (!templateName || blocks.length === 0) {
      return toast({ title: 'Nome e pelo menos 1 bloco são obrigatórios', variant: 'destructive' })
    }
    if (!subject) {
      return toast({ title: 'O campo Assunto é obrigatório', variant: 'destructive' })
    }

    const tmplData = {
      name: templateName,
      subject,
      description,
      attachments,
      blocks,
      fields,
      assignedUsers,
      assignedDepartments,
    }

    if (editingTemplateId) {
      updateTemplate({ ...templates.find((t) => t.id === editingTemplateId)!, ...tmplData })
      toast({ title: 'Template atualizado!' })
    } else {
      const newTemplate: Template = {
        id: `tmpl_${generateId()}`,
        createdAt: new Date().toISOString(),
        ...tmplData,
      }
      addTemplate(newTemplate)
      setEditingTemplateId(newTemplate.id)
      toast({ title: 'Novo template salvo!' })
    }
  }

  const moveItem = <T extends { id: string }>(
    list: T[],
    setList: (v: T[]) => void,
    idx: number,
    dir: number,
  ) => {
    if (idx + dir < 0 || idx + dir >= list.length) return
    const arr = [...list]
    ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
    setList(arr)
  }

  const handleFileAttach = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/*,application/pdf'
    input.onchange = (e) => {
      const selectedFiles = Array.from((e.target as HTMLInputElement).files || [])
      const newFiles = selectedFiles.map((f) => f.name)
      setAttachments((prev) => [...prev, ...newFiles])
    }
    input.click()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4 overflow-hidden w-full max-w-7xl mx-auto">
      {/* 1. Global Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card p-3 rounded-md shadow-sm border shrink-0 gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <Button onClick={createNewTemplate} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Novo Checklist
          </Button>
          <div className="hidden sm:block h-6 w-px bg-border shrink-0" />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Editar:
            </span>
            <select
              className="h-9 w-full sm:w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={editingTemplateId || ''}
              onChange={(e) => {
                const t = templates.find((x) => x.id === e.target.value)
                if (t) loadTemplate(t)
              }}
            >
              <option value="" disabled>
                Selecione um checklist existente...
              </option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2 shrink-0 w-full sm:w-auto" variant="default">
          <Save className="h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      {/* 2. Checklist Identity */}
      <div className="bg-card p-5 rounded-md shadow-sm border shrink-0 flex flex-col gap-4 overflow-y-auto max-h-[300px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Nome do Checklist
            </label>
            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="font-bold text-lg h-10"
              placeholder="Ex: Expedição de carga"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Assunto <span className="text-destructive">*</span>
            </label>
            <SubjectSelect value={subject} onChange={setSubject} subjects={subjectsList} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explique a função deste checklist..."
            className="resize-none min-h-[80px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Anexos
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="outline" onClick={handleFileAttach} className="gap-2 shrink-0">
              <Paperclip className="h-4 w-4" /> Incluir Anexo
            </Button>
            {attachments.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {attachments.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm border shadow-sm"
                  >
                    <span className="truncate max-w-[200px]">{file}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Configuration Toolbar & Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-card rounded-md border shadow-sm">
        <Tabs
          value={mainTab}
          onValueChange={setMainTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {/* Configuration Toolbar */}
          <div className="border-b px-2 shrink-0 overflow-x-auto bg-muted/30">
            <TabsList className="bg-transparent h-12 p-0 flex gap-2 w-max items-end">
              {[
                { id: 'canvas', label: 'Campos e Blocos' },
                { id: 'assignments', label: 'Atribuições' },
                { id: 'approvals', label: 'Aprovações' },
                { id: 'export', label: 'Export e Alertas' },
                { id: 'scales', label: 'Escalas (Métricas)' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-t-md rounded-b-none px-4 py-3 text-sm font-medium transition-none border-b-2 border-transparent border border-b-0 border-transparent data-[state=active]:border-border"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative bg-muted/10">
            {/* CANVAS TAB */}
            <TabsContent
              value="canvas"
              forceMount
              className="data-[state=inactive]:hidden absolute inset-0 m-0 p-4 flex flex-col md:flex-row gap-4 overflow-hidden outline-none"
            >
              {/* Main Canvas Area */}
              <div className="flex-1 flex flex-col gap-4 overflow-hidden bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md border shrink-0">
                  <span className="text-sm font-medium px-2">Estrutura de Blocos</span>
                  <Button variant="outline" size="sm" onClick={handleAddBlock} className="gap-2">
                    <Layers className="h-4 w-4" /> Adicionar Bloco
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                  {blocks.map((b, bIdx) => (
                    <div
                      key={b.id}
                      className={`bg-card rounded-lg border shadow-sm transition-all ${activeItem?.id === b.id && activeItem.type === 'block' ? 'ring-2 ring-primary' : ''}`}
                    >
                      <div
                        className="p-3 bg-muted/30 border-b flex items-center justify-between cursor-pointer group"
                        onClick={() => {
                          setActiveItem({ id: b.id, type: 'block' })
                          setActiveTab('properties')
                        }}
                      >
                        <div className="font-semibold flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" /> {b.name}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveItem(blocks, setBlocks, bIdx, -1)
                            }}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveItem(blocks, setBlocks, bIdx, 1)
                            }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              setBlocks(blocks.filter((x) => x.id !== b.id))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 space-y-2 min-h-[60px]">
                        {fields
                          .filter((f) => f.blockId === b.id)
                          .map((f, fIdx, arr) => (
                            <Card
                              key={f.id}
                              className={`p-3 cursor-pointer group ${activeItem?.id === f.id && activeItem.type === 'field' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveItem({ id: f.id, type: 'field' })
                                setActiveTab('properties')
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm flex items-center gap-2 truncate">
                                    {f.label}{' '}
                                    {f.required && <span className="text-destructive">*</span>}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground uppercase mt-0.5">
                                    {f.type}
                                  </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const globIdx = fields.findIndex((x) => x.id === f.id)
                                      const targetIdx = fields.findIndex(
                                        (x) => x.id === arr[fIdx - 1]?.id,
                                      )
                                      if (targetIdx !== -1) moveItem(fields, setFields, globIdx, -1)
                                    }}
                                  >
                                    <ChevronUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setFields(fields.filter((x) => x.id !== f.id))
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Toolbox & Properties */}
              <div className="w-full md:w-80 bg-card border rounded-lg p-4 shadow-sm flex flex-col shrink-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <TabsList className="w-full grid grid-cols-2 shrink-0 h-10">
                    <TabsTrigger value="toolbox" className="text-xs px-1">
                      Componentes
                    </TabsTrigger>
                    <TabsTrigger value="properties" disabled={!activeItem} className="text-xs px-1">
                      Propriedades
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="toolbox"
                    forceMount
                    className="data-[state=inactive]:hidden flex-1 overflow-y-auto mt-4 pr-2 outline-none m-0"
                  >
                    <Toolbox onAdd={handleAddField} />
                  </TabsContent>

                  <TabsContent
                    value="properties"
                    forceMount
                    className="data-[state=inactive]:hidden flex-1 overflow-y-auto mt-4 pr-2 outline-none m-0"
                  >
                    {activeItem ? (
                      <PropertiesPanel
                        activeItem={activeItem}
                        fields={fields}
                        blocks={blocks}
                        handleUpdateField={(id, up) =>
                          setFields(fields.map((f) => (f.id === id ? { ...f, ...up } : f)))
                        }
                        handleUpdateBlock={(id, up) =>
                          setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...up } : b)))
                        }
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">Selecione um bloco ou campo.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            {/* OTHER TABS */}
            <TabsContent
              value="assignments"
              forceMount
              className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none"
            >
              <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm p-6">
                <ConfigPanel
                  assignedUsers={assignedUsers}
                  assignedDepartments={assignedDepartments}
                  onChange={(u, d) => {
                    setAssignedUsers(u)
                    setAssignedDepartments(d)
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent
              value="approvals"
              forceMount
              className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none"
            >
              <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm p-12 text-center">
                <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Aprovações</h3>
                <p className="text-muted-foreground text-sm">
                  Configure o fluxo de aprovação para este checklist. (Em breve)
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="export"
              forceMount
              className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none"
            >
              <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Exportação e Alertas</h3>
                <p className="text-muted-foreground text-sm">
                  Defina regras de exportação de PDF e alertas por email. (Em breve)
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="scales"
              forceMount
              className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none"
            >
              <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm p-12 text-center">
                <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Escalas (Métricas)</h3>
                <p className="text-muted-foreground text-sm">
                  Defina pontuações, pesos e escalas de avaliação. (Em breve)
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
