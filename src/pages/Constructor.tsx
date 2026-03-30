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
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
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
  Copy,
  Eye,
} from 'lucide-react'
import { TemplateSearchDialog } from '@/components/constructor/TemplateSearchDialog'
import { TemplatePreview } from '@/components/constructor/TemplatePreview'

export default function Constructor() {
  const { templates, addTemplate, updateTemplate, currentUser } = useAppStore()
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false)

  const [templateName, setTemplateName] = useState('')
  const [nameError, setNameError] = useState<string | null>(null)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])

  const [blocks, setBlocks] = useState<FormBlock[]>([])
  const [fields, setFields] = useState<FormField[]>([])
  const [assignedUsers, setAssignedUsers] = useState<string[]>([])
  const [assignedDepartments, setAssignedDepartments] = useState<string[]>([])

  const [activeItem, setActiveItem] = useState<ActiveItem>(null)
  const [mainTab, setMainTab] = useState('campos_blocos')

  const [subjectsList, setSubjectsList] = useState<Subject[]>([])

  const [searchOpen, setSearchOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    getSubjects().then(setSubjectsList).catch(console.error)
  }, [])

  useEffect(() => {
    if (!hasLoadedInitial && templates.length > 0) {
      loadTemplate(templates[0])
      setHasLoadedInitial(true)
    }
  }, [templates, hasLoadedInitial])

  useEffect(() => {
    if (nameError) setNameError(null)
  }, [templateName])

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
    setNameError(null)
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
    setMainTab('campos_blocos')
  }

  const createNewTemplate = () => {
    setEditingTemplateId(null)
    setTemplateName('')
    setNameError(null)
    setSubject('')
    setDescription('')
    setAttachments([])
    setBlocks([])
    setFields([])
    setActiveItem(null)
    setMainTab('campos_blocos')
  }

  const handleClone = () => {
    const copyName = `${templateName || 'Checklist'} - Cópia`
    setEditingTemplateId(null)
    setTemplateName(copyName)

    const isDuplicate = templates.some(
      (t) => t.name.trim().toLowerCase() === copyName.trim().toLowerCase(),
    )
    if (isDuplicate) {
      setNameError('Já existe um checklist com este nome. Escolha um nome diferente.')
    } else {
      setNameError(null)
    }

    toast({ title: 'Template clonado', description: 'Você está editando uma cópia não salva.' })
  }

  const handleAddBlock = () => {
    const newBlock: FormBlock = {
      id: `b_${generateId().substring(0, 6)}`,
      name: `Novo Bloco ${blocks.length + 1}`,
    }
    setBlocks([...blocks, newBlock])
    setActiveItem({ id: newBlock.id, type: 'block' })
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
  }

  const handleSave = () => {
    if (!templateName.trim()) {
      setMainTab('campos_blocos')
      setNameError('O Nome do checklist é obrigatório')
      return toast({ title: 'O Nome do checklist é obrigatório', variant: 'destructive' })
    }

    const isDuplicate = templates.some(
      (t) =>
        t.name.trim().toLowerCase() === templateName.trim().toLowerCase() &&
        t.id !== editingTemplateId,
    )
    if (isDuplicate) {
      setMainTab('campos_blocos')
      setNameError('Já existe um checklist com este nome. Escolha um nome diferente.')
      return toast({
        title: 'Nome duplicado',
        description: 'Já existe um checklist com este nome.',
        variant: 'destructive',
      })
    }

    if (!subject) {
      setMainTab('campos_blocos')
      return toast({
        title: 'O campo Assunto é obrigatório nas configurações gerais',
        variant: 'destructive',
      })
    }
    if (!description) {
      setMainTab('campos_blocos')
      return toast({
        title: 'O campo Descrição é obrigatório nas configurações gerais',
        variant: 'destructive',
      })
    }
    if (blocks.length === 0) {
      setMainTab('campos_blocos')
      return toast({ title: 'Pelo menos 1 bloco é obrigatório', variant: 'destructive' })
    }

    const tmplData = {
      name: templateName.trim(),
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
      {/* Global Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-card border-b shrink-0 gap-4 z-20 shadow-sm relative">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setSearchOpen(true)}
            className="w-[220px] justify-start bg-muted/50 border-transparent hover:border-input shadow-none"
          >
            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {editingTemplateId
                ? templates.find((t) => t.id === editingTemplateId)?.name || 'Desconhecido'
                : 'Novo Template'}
            </span>
          </Button>

          <div className="hidden sm:block h-5 w-px bg-border" />

          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className={`h-9 font-bold text-sm bg-transparent w-[200px] sm:w-[250px] shadow-none ${nameError ? 'border-destructive focus-visible:ring-destructive text-destructive' : 'border-transparent hover:border-input focus-visible:ring-1'}`}
            placeholder="Nome do Checklist"
          />
        </div>

        <div className="flex items-center justify-end w-full sm:w-auto shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewOpen(true)}
            size="sm"
            className="gap-2 shadow-sm border-primary/20 hover:bg-primary/5 text-primary"
          >
            <Eye className="h-4 w-4" /> Visualizar
          </Button>
          {editingTemplateId && (
            <Button variant="outline" onClick={handleClone} size="sm" className="gap-2 shadow-sm">
              <Copy className="h-4 w-4" /> Clonar
            </Button>
          )}
          <Button onClick={handleSave} size="sm" className="gap-2 shadow-sm">
            <Save className="h-4 w-4" /> Salvar
          </Button>
        </div>
      </header>

      {/* Main Tabs and Content Area */}
      <Tabs
        value={mainTab}
        onValueChange={setMainTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Horizontal Navigation */}
        <div className="w-full bg-card border-b z-10 shrink-0 px-4 pt-2 shadow-sm">
          <TabsList className="h-10 bg-transparent p-0 flex gap-6 w-max justify-start overflow-x-auto no-scrollbar">
            <TabsTrigger
              value="campos_blocos"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full text-sm font-medium"
            >
              Campos e Blocos
            </TabsTrigger>
            <TabsTrigger
              value="atribuicoes"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full text-sm font-medium"
            >
              Atribuições
            </TabsTrigger>
            <TabsTrigger
              value="exportacao"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full text-sm font-medium"
            >
              Opções de Exportação
            </TabsTrigger>
            <TabsTrigger
              value="aprovacao"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full text-sm font-medium"
            >
              Fluxo de Aprovação
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden relative bg-muted/10">
          {/* TAB: CAMPOS E BLOCOS */}
          <TabsContent
            value="campos_blocos"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 flex flex-col outline-none"
          >
            {/* Horizontal Toolbox fixed below tabs */}
            <div className="w-full bg-card border-b p-3 shrink-0 shadow-sm overflow-x-auto no-scrollbar z-10 sticky top-0">
              <Toolbox onAdd={handleAddField} onAddBlock={handleAddBlock} />
            </div>

            {/* Scrollable Canvas Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {/* General Settings inline form */}
                <Card className="p-6 border shadow-sm animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        Nome <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="Ex: Inspeção de Recebimento de Carga"
                        className={
                          nameError ? 'border-destructive focus-visible:ring-destructive' : ''
                        }
                      />
                      {nameError && (
                        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                          {nameError}
                        </p>
                      )}
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
                  <div className="space-y-2 mt-6">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      Descrição <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explique a função deste checklist para os operadores..."
                      className="resize-y h-[60px] min-h-[60px]"
                    />
                  </div>

                  <div className="space-y-3 mt-6 pt-6 border-t">
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
                    <div className="bg-muted/30 rounded-lg p-4 min-h-[60px] border border-dashed flex items-center justify-center">
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
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Form Blocks */}
                {blocks.map((b, bIdx) => (
                  <div
                    key={b.id}
                    className={`bg-card rounded-xl border transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
                      activeItem?.id === b.id && activeItem.type === 'block'
                        ? 'border-primary ring-1 ring-primary shadow-md'
                        : 'border-border shadow-sm hover:border-primary/30'
                    }`}
                  >
                    <div
                      className="px-5 py-4 bg-muted/30 border-b flex items-center justify-between cursor-pointer group rounded-t-xl"
                      onClick={() => setActiveItem({ id: b.id, type: 'block' })}
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
                                    if (targetIdx !== -1) moveItem(fields, setFields, globIdx, -1)
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
                          Arraste campos ou adicione pelo menu no topo
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {blocks.length === 0 && (
                  <div className="text-center p-12 bg-card rounded-xl border border-dashed text-muted-foreground shadow-sm">
                    <Layers className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Nenhum bloco de informação criado.</p>
                    <Button variant="link" onClick={handleAddBlock} className="mt-2 text-primary">
                      Criar primeiro bloco
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB: ASSIGNMENTS */}
          <TabsContent
            value="atribuicoes"
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

          {/* TAB: EXPORT OPTIONS */}
          <TabsContent
            value="exportacao"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-xl border shadow-sm p-16 text-center animate-in fade-in">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">Opções de Exportação</h3>
              <p className="text-muted-foreground">
                Defina regras de exportação de PDF e alertas por email. (Em breve)
              </p>
            </div>
          </TabsContent>

          {/* TAB: APPROVALS */}
          <TabsContent
            value="aprovacao"
            forceMount
            className="data-[state=inactive]:hidden absolute inset-0 m-0 overflow-y-auto p-6 outline-none bg-background"
          >
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-xl border shadow-sm p-16 text-center animate-in fade-in">
              <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">Fluxo de Aprovação</h3>
              <p className="text-muted-foreground">
                Configure as regras de aprovação para este checklist. (Em breve)
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Properties Sheet */}
      <Sheet open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md overflow-y-auto p-0 flex flex-col bg-card"
        >
          <div className="p-6 pb-2 border-b bg-muted/10 shrink-0">
            <SheetHeader>
              <SheetTitle>
                {activeItem?.type === 'block' ? 'Propriedades do Bloco' : 'Propriedades do Campo'}
              </SheetTitle>
              <SheetDescription>
                Configure as regras e detalhes do item selecionado.
              </SheetDescription>
            </SheetHeader>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-background">
            {activeItem && (
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
            )}
          </div>
        </SheetContent>
      </Sheet>

      <TemplateSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        templates={templates}
        subjects={subjectsList}
        onSelect={(val) => {
          if (val === 'new') createNewTemplate()
          else loadTemplate(val)
          setSearchOpen(false)
        }}
      />

      <TemplatePreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        blocks={blocks}
        fields={fields}
        templateName={templateName}
        description={description}
      />
    </div>
  )
}
