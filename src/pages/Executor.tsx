import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { FieldRenderer } from '@/components/executor/FieldRenderer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { generateId } from '@/lib/utils'
import { Save, Send } from 'lucide-react'

export default function Executor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templates, drafts, saveDraft, submitAudit } = useAppStore()

  const template = templates.find((t) => t.id === id)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  useEffect(() => {
    if (id && drafts[id]) {
      setAnswers(drafts[id])
      toast({ description: 'Rascunho recuperado com sucesso.' })
    }
  }, [id, drafts])

  if (!template) {
    return <div className="p-8 text-center">Template não encontrado.</div>
  }

  const handleChange = (fieldId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleSaveDraft = () => {
    saveDraft(template.id, answers)
    toast({ title: 'Sucesso', description: 'Rascunho salvo localmente.' })
    navigate('/')
  }

  const handleSubmit = () => {
    const visibleFields = template.fields.filter((f) => {
      if (!f.logicDependsOn) return true
      return answers[f.logicDependsOn] === f.logicValue
    })

    const missing = visibleFields.find((f) => f.required && !answers[f.id])
    if (missing) {
      toast({
        title: 'Campos obrigatórios',
        description: `O campo "${missing.label}" é obrigatório.`,
        variant: 'destructive',
      })
      return
    }

    submitAudit({
      id: `aud_${generateId().substring(0, 8)}`,
      templateId: template.id,
      templateName: template.name,
      operatorName: 'Operador Logístico 1',
      timestamp: new Date().toISOString(),
      status: 'Concluído',
      answers,
    })

    toast({ title: 'Auditoria Concluída', description: 'Os dados foram salvos e sincronizados.' })
    navigate('/')
  }

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{template.name}</h1>
        <p className="text-muted-foreground">{template.description}</p>
      </div>

      <div className="space-y-6">
        {template.fields.map((field) => {
          if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue) {
            return null
          }
          return (
            <div key={field.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <FieldRenderer
                field={field}
                value={answers[field.id]}
                onChange={(v) => handleChange(field.id, v)}
                allAnswers={answers}
              />
            </div>
          )
        })}
      </div>

      <Card className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t md:left-[16rem] z-10 flex justify-end gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none">
        <Button variant="outline" onClick={handleSaveDraft} className="gap-2 h-12 px-6">
          <Save className="h-4 w-4" /> Salvar Rascunho
        </Button>
        <Button
          onClick={handleSubmit}
          className="gap-2 h-12 px-8 bg-[#f59e0b] hover:bg-[#d97706] text-white"
        >
          <Send className="h-4 w-4" /> Finalizar Auditoria
        </Button>
      </Card>
    </div>
  )
}
