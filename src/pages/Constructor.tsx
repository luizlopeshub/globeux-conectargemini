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
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  PanelRightClose,
  PanelRightOpen,
  Settings,
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
  const [showRightPanel, setShowRightPanel] = useState(true)

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
    setMainTab('settings')
  }

  const handleAddBlock = () => {
    const newBlock: FormBlock = {
      id: `b_${generateId().substring(0, 6)}`,
      name: `Novo Bloco ${blocks.length + 1}`,
    }
    setBlocks([...blocks, newBlock])
    setActiveItem({ id: newBlock.id, type: 'block' })
    setActiveTab('properties')
    setShowRightPanel(true)
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
    setShowRightPanel(true)
  }

  const handleSave = () => {
    if (!templateName || blocks.length === 0) {
      return toast({ title: 'Nome e pelo menos 1 bloco são obrigatórios', variant: 'destructive' })
    }
    if (!subject) {
      setMainTab('settings')
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
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      <Tabs
        value={mainTab}
        onValueChange={setMainTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Header: Global Actions & Navigation */}
        <header className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-card border-b shrink-0 gap-4 z-10 shadow-sm relative">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select
              value={editingTemplateId || 'new'}
              onValueChange={(val) => {
                if (val === 'new') createNewTemplate()
                else {
                  const t = templates.find((x) => x.id === val)
                  if (t) loadTemplate(t)
                }
              }}
            >
              <SelectTrigger className="w-[200px] h-9 bg-muted/50 border-transparent focus:ring-1">
                <SelectValue placeholder="Selecione um checklist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new" className="font-semibold text-primary">
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Criar Novo...
                  </span>
                </SelectItem>
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden sm:block h-5 w-px bg-border" />

            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="h-9 font-bold text-sm border-transparent hover:border-input focus:border-input bg-transparent w-[200px] sm:w-[250px] shadow-none"
              placeholder="Nome do Checklist"
            />
          </div>

          <div className="flex-1 flex justify-center w-full sm:w-auto overflow-x-auto no-scrollbar">
            <TabsList className="h-9 bg-muted/50 p-1 shrink-0 flex w-max">
              <TabsTrigger
                value="settings"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Geral
              </TabsTrigger>
              <TabsTrigger
                value="canvas"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Construtor
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Atribuições
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Aprovações
              </TabsTrigger>
              <TabsTrigger
                value="export"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Export
              </TabsTrigger>
              <TabsTrigger
                value="scales"
                className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Escalas
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center justify-end w-full sm:w-auto shrink-0">
            <Button onClick={handleSave} size="sm" className="gap-2 shadow-sm">
              <Save className="h-4 w-4" /> Salvar
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-muted/10">
          {/* TAB: CANVAS */}
          <TabsContent
            value="canvas"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 p-0 outline-none"
          >
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel
                defaultSize={showRightPanel ? 75 : 100}
                minSize={50}
                className="relative flex flex-col h-full overflow-hidden bg-muted/10"
              >
                <div className="flex items-center justify-between p-3 border-b bg-card/80 backdrop-blur-sm shrink-0 z-10">
                  <span className="text-sm font-semibold text-muted-foreground px-2 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Estrutura do Formulário
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddBlock}
                      className="gap-2 bg-background h-8"
                    >
                      <Plus className="h-3.5 w-3.5" /> Adicionar Bloco
                    </Button>
                    <Button
                      variant={showRightPanel ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => setShowRightPanel(!showRightPanel)}
                      className="h-8 w-8 p-0 bg-background"
                      title={showRightPanel ? 'Ocultar painel' : 'Mostrar painel'}
                    >
                      {showRightPanel ? (
                        <PanelRightClose className="h-4 w-4" />
                      ) : (
                        <PanelRightOpen className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <div className="max-w-4xl mx-auto space-y-8 pb-20">
                    {blocks.map((b, bIdx) => (
                      <div
                        key={b.id}
                        className={`bg-card rounded-xl border transition-all duration-200 ${
                          activeItem?.id === b.id && activeItem.type === 'block'
                            ? 'border-primary ring-1 ring-primary shadow-md'
                            : 'border-border shadow-sm hover:border-primary/30'
                        }`}
                      >
                        <div
                          className="px-5 py-4 bg-muted/30 border-b flex items-center justify-between cursor-pointer group rounded-t-xl"
                          onClick={() => {
                            setActiveItem({ id: b.id, type: 'block' })
                            setActiveTab('properties')
                            if (!showRightPanel) setShowRightPanel(true)
                          }}
                        >
                          <div className="font-semibold text-base flex items-center gap-3">
                            <GripVertical className="h-5 w-5 text-muted-foreground opacity-50" />
                            {b.name}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                setBlocks(blocks.filter((x) => x.id !== b.id))
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 space-y-3 min-h-[100px] bg-background/50 rounded-b-xl">
                          {fields
                            .filter((f) => f.blockId === b.id)
                            .map((f, fIdx, arr) => (
                              <Card
                                key={f.id}
                                className={`p-0 cursor-pointer group transition-all overflow-hidden ${
                                  activeItem?.id === f.id && activeItem.type === 'field'
                                    ? 'ring-2 ring-primary border-transparent shadow-sm'
                                    : 'hover:border-primary/40 border-border shadow-sm'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveItem({ id: f.id, type: 'field' })
                                  setActiveTab('properties')
                                  if (!showRightPanel) setShowRightPanel(true)
                                }}
                              >
                                <div className="flex items-stretch bg-card">
                                  <div className="w-10 flex items-center justify-center bg-muted/40 border-r cursor-move shrink-0 group-hover:bg-muted/60 transition-colors">
                                    <GripVertical className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 p-3.5 min-w-0 flex flex-col justify-center">
                                    <div className="font-medium text-sm flex items-center gap-2 truncate">
                                      {f.label}
                                      {f.required && (
                                        <span className="text-destructive font-bold">*</span>
                                      )}
                                    </div>
                                    <div className="text-[11px] font-medium text-muted-foreground uppercase mt-1 tracking-wider">
                                      {f.type}
                                    </div>
                                  </div>
                                  <div className="flex items-center px-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-muted/20 to-transparent">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const globIdx = fields.findIndex((x) => x.id === f.id)
                                        const targetIdx = fields.findIndex(
                                          (x) => x.id === arr[fIdx - 1]?.id,
                                        )
                                        if (targetIdx !== -1)
                                          moveItem(fields, setFields, globIdx, -1)
                                      }}
                                    >
                                      <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setFields(fields.filter((x) => x.id !== f.id))
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          {fields.filter((f) => f.blockId === b.id).length === 0 && (
                            <div className="h-full flex items-center justify-center text-sm text-muted-foreground/50 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
                              Arraste campos ou adicione pelo painel lateral
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {blocks.length === 0 && (
                      <div className="text-center p-12 bg-card rounded-xl border border-dashed text-muted-foreground shadow-sm">
                        <Layers className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>Nenhum bloco de informação criado.</p>
                        <Button
                          variant="link"
                          onClick={handleAddBlock}
                          className="mt-2 text-primary"
                        >
                          Criar primeiro bloco
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>

              {showRightPanel && (
                <>
                  <ResizableHandle
                    withHandle
                    className="bg-border w-1 hover:w-2 hover:bg-primary/20 transition-all"
                  />
                  <ResizablePanel
                    defaultSize={25}
                    minSize={20}
                    maxSize={40}
                    className="flex flex-col bg-card h-full shadow-xl z-20"
                  >
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      <div className="p-2 border-b bg-muted/10 shrink-0">
                        <TabsList className="grid grid-cols-2 w-full h-9 bg-muted/50">
                          <TabsTrigger value="toolbox" className="text-xs font-medium">
                            Biblioteca
                          </TabsTrigger>
                          <TabsTrigger
                            value="properties"
                            disabled={!activeItem}
                            className="text-xs font-medium"
                          >
                            Propriedades
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="toolbox"
                        forceMount
                        className="data-[state=inactive]:hidden flex-1 overflow-y-auto outline-none m-0 p-4 bg-background"
                      >
                        <Toolbox onAdd={handleAddField} />
                      </TabsContent>

                      <TabsContent
                        value="properties"
                        forceMount
                        className="data-[state=inactive]:hidden flex-1 overflow-y-auto outline-none m-0 p-4 bg-background"
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
                          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground opacity-50 space-y-4 p-4">
                            <Settings className="h-12 w-12" />
                            <p className="text-sm">
                              Selecione um bloco ou campo no construtor para editar suas
                              propriedades.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </TabsContent>

          {/* TAB: SETTINGS */}
          <TabsContent
            value="settings"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in pb-12">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Configurações Gerais</h2>
                <p className="text-muted-foreground">
                  Defina os metadados principais deste checklist.
                </p>
              </div>

              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Nome do Checklist
                      </label>
                      <Input
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="h-10"
                        placeholder="Ex: Expedição"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        Assunto <span className="text-destructive">*</span>
                      </label>
                      <SubjectSelect
                        value={subject}
                        onChange={setSubject}
                        subjects={subjectsList}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Descrição
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explique a função deste checklist para os operadores..."
                      className="resize-y min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                      <span>Anexos Padrão</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleFileAttach}
                        className="h-8 gap-2"
                      >
                        <Paperclip className="h-3.5 w-3.5" /> Adicionar
                      </Button>
                    </label>
                    <div className="bg-muted/30 rounded-lg p-4 min-h-[80px] border border-dashed flex items-center justify-center">
                      {attachments.length > 0 ? (
                        <div className="flex gap-2 flex-wrap w-full">
                          {attachments.map((file, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="px-3 py-1.5 flex items-center gap-2 text-sm bg-background border-border"
                            >
                              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="truncate max-w-[200px]">{file}</span>
                              <button
                                onClick={() =>
                                  setAttachments(attachments.filter((_, idx) => idx !== i))
                                }
                                className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center">
                          Nenhum anexo incluído.
                          <br />
                          Clique em Adicionar para incluir manuais ou referências em PDF/Imagens.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB: ASSIGNMENTS */}
          <TabsContent
            value="assignments"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in pb-12">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Atribuições</h2>
                <p className="text-muted-foreground">
                  Controle quem pode visualizar e executar este checklist.
                </p>
              </div>
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <ConfigPanel
                  assignedUsers={assignedUsers}
                  assignedDepartments={assignedDepartments}
                  onChange={(u, d) => {
                    setAssignedUsers(u)
                    setAssignedDepartments(d)
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* OTHER TABS */}
          <TabsContent
            value="approvals"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-xl border shadow-sm p-16 text-center">
              <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">Aprovações</h3>
              <p className="text-muted-foreground">
                Configure o fluxo de aprovação para este checklist. (Em breve)
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="export"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-xl border shadow-sm p-16 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">Exportação e Alertas</h3>
              <p className="text-muted-foreground">
                Defina regras de exportação de PDF e alertas por email. (Em breve)
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="scales"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-xl border shadow-sm p-16 text-center">
              <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">Escalas (Métricas)</h3>
              <p className="text-muted-foreground">
                Defina pontuações, pesos e escalas de avaliação. (Em breve)
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
