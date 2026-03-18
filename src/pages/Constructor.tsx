import { useState, useEffect } from 'react'
import { generateId } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { FormField, FormBlock, FieldType, Template } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Toolbox } from '@/components/constructor/Toolbox'
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
} from 'lucide-react'

export type ActiveItem = { id: string; type: 'block' | 'field' } | null

export default function Constructor() {
  const { templates, addTemplate, updateTemplate, currentUser } = useAppStore()
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [templateName, setTemplateName] = useState('Novo Checklist')
  const [blocks, setBlocks] = useState<FormBlock[]>([])
  const [fields, setFields] = useState<FormField[]>([])
  const [assignedUsers, setAssignedUsers] = useState<string[]>([])
  const [assignedDepartments, setAssignedDepartments] = useState<string[]>([])
  const [activeItem, setActiveItem] = useState<ActiveItem>(null)
  const [activeTab, setActiveTab] = useState('toolbox')

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
  }

  const createNewTemplate = () => {
    setEditingTemplateId(null)
    setTemplateName('Novo Checklist')
    setBlocks([{ id: `b_${generateId()}`, name: 'Bloco 1: Cadastro' }])
    setFields([])
    setActiveItem(null)
    setActiveTab('toolbox')
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
    if (!templateName || blocks.length === 0) return toast({ title: 'Adicione pelo menos 1 bloco' })
    const tmplData = { name: templateName, blocks, fields, assignedUsers, assignedDepartments }
    if (editingTemplateId) {
      updateTemplate({ ...templates.find((t) => t.id === editingTemplateId)!, ...tmplData })
      toast({ title: 'Template atualizado!' })
    } else {
      const newTemplate: Template = {
        id: `tmpl_${generateId()}`,
        description: 'Gerado pelo construtor.',
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

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
      <div className="w-64 bg-card border rounded-lg p-4 flex flex-col gap-4 shadow-sm shrink-0 hidden md:flex">
        <Button onClick={createNewTemplate} className="w-full gap-2">
          <Plus className="h-4 w-4" /> Novo Checklist
        </Button>
        <div className="flex-1 overflow-y-auto space-y-2">
          {templates.map((t) => (
            <Card
              key={t.id}
              className={`p-3 cursor-pointer ${editingTemplateId === t.id ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => loadTemplate(t)}
            >
              <div className="font-medium text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="truncate">{t.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden bg-muted/30 p-4 rounded-lg border">
        <div className="flex justify-between items-center bg-card p-3 rounded-md shadow-sm border shrink-0">
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="max-w-xs font-semibold text-lg border-none shadow-none focus-visible:ring-0"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddBlock} className="gap-2">
              <Layers className="h-4 w-4" /> Bloco de Informações
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-6 p-1">
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
                            {f.label} {f.required && <span className="text-destructive">*</span>}
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
                              const targetIdx = fields.findIndex((x) => x.id === arr[fIdx - 1]?.id)
                              if (targetIdx !== -1) moveItem(fields, setFields, globIdx, -1) // Simplify, just swap adjacent in global list
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

      <div className="w-80 bg-card border rounded-lg p-4 shadow-sm flex flex-col shrink-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full grid grid-cols-3 shrink-0 h-12">
            <TabsTrigger value="toolbox" className="text-xs px-1">
              Comps
            </TabsTrigger>
            <TabsTrigger value="properties" disabled={!activeItem} className="text-xs px-1">
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
