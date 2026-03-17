import { useState } from 'react'
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
import { Save, GripVertical, Trash2 } from 'lucide-react'

export default function Constructor() {
  const { addTemplate } = useAppStore()
  const [templateName, setTemplateName] = useState('Novo Checklist')
  const [fields, setFields] = useState<FormField[]>([])
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null)

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `field_${generateId().substring(0, 6)}`,
      type,
      label: `Novo Campo (${type})`,
      required: false,
    }
    setFields([...fields, newField])
    setActiveFieldId(newField.id)
  }

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
    if (activeFieldId === id) setActiveFieldId(null)
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
    const newTemplate: Template = {
      id: `tmpl_${generateId()}`,
      name: templateName,
      description: 'Template gerado pelo construtor.',
      createdAt: new Date().toISOString(),
      fields,
    }
    addTemplate(newTemplate)
    toast({ title: 'Sucesso', description: 'Template salvo com sucesso!' })
    setFields([])
    setTemplateName('Novo Checklist')
    setActiveFieldId(null)
  }

  const activeField = fields.find((f) => f.id === activeFieldId)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
      <Toolbox onAdd={handleAddField} />

      <div className="flex-1 flex flex-col gap-4 overflow-hidden bg-muted/30 p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center bg-card p-3 rounded-md shadow-sm border">
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="max-w-xs font-semibold text-lg border-none shadow-none focus-visible:ring-0"
          />
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar Template
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 p-1">
          {fields.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Arraste ou clique nos componentes ao lado para começar
            </div>
          ) : (
            fields.map((f) => (
              <Card
                key={f.id}
                className={`p-4 cursor-pointer transition-all ${activeFieldId === f.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`}
                onClick={() => setActiveFieldId(f.id)}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-move" />
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {f.label}
                      {f.required && <span className="text-destructive">*</span>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {f.type}
                    </div>
                    {f.logicDependsOn && (
                      <div className="text-xs bg-orange-100 text-orange-800 p-1 mt-2 rounded inline-block">
                        Lógica: Mostrar se {f.logicDependsOn} = {f.logicValue}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveField(f.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="w-80 bg-card border rounded-lg p-4 overflow-y-auto shadow-sm">
        <h3 className="font-semibold text-lg mb-4 pb-2 border-b">Propriedades</h3>
        {!activeField ? (
          <p className="text-sm text-muted-foreground">Selecione um campo no centro para editar.</p>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
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
                <p className="text-xs text-muted-foreground">Use os IDs dos campos entre chaves.</p>
              </div>
            )}

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm text-primary">Lógica de Exibição</h4>
              <div className="space-y-2">
                <Label>Depende do campo (ID)</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={activeField.logicDependsOn || ''}
                  onChange={(e) =>
                    handleUpdateField(activeField.id, { logicDependsOn: e.target.value })
                  }
                >
                  <option value="">Sempre visível</option>
                  {fields
                    .filter((f) => f.id !== activeField.id)
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label} ({f.id})
                      </option>
                    ))}
                </select>
              </div>
              {activeField.logicDependsOn && (
                <div className="space-y-2 animate-in slide-down">
                  <Label>Mostrar apenas quando o valor for:</Label>
                  <Input
                    value={activeField.logicValue || ''}
                    onChange={(e) =>
                      handleUpdateField(activeField.id, { logicValue: e.target.value })
                    }
                    placeholder="Ex: Avariado"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                ID: {activeField.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
