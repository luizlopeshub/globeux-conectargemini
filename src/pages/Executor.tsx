import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { FieldRenderer } from '@/components/executor/FieldRenderer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { generateId } from '@/lib/utils'
import { Save, Send, AlertOctagon } from 'lucide-react'

export default function Executor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templates, drafts, saveDraft, submitAudit, currentUser } = useAppStore()

  const template = templates.find((t) => t.id === id)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  useEffect(() => {
    if (id && drafts[id]) {
      setAnswers(drafts[id])
      toast({ description: 'Rascunho recuperado.' })
    }
  }, [id, drafts])

  const hardValidationErrors = useMemo(() => {
    const errors: Record<string, string> = {}
    if (!template) return errors
    template.fields.forEach((f) => {
      if (
        f.type === 'number' &&
        f.hardValidation &&
        answers[f.id] !== undefined &&
        answers[f.id] !== ''
      ) {
        const val = Number(answers[f.id])
        if (
          (f.hardValidationMin !== undefined && val < f.hardValidationMin) ||
          (f.hardValidationMax !== undefined && val > f.hardValidationMax)
        ) {
          errors[f.id] =
            f.hardValidationMessage ||
            `Valor fora do limite permitido (${f.hardValidationMin} - ${f.hardValidationMax}).`
        }
      }
    })
    return errors
  }, [answers, template])

  const hasHardErrors = Object.keys(hardValidationErrors).length > 0

  if (!template) return <div className="p-8 text-center">Template não encontrado.</div>
  if (!currentUser) return <div className="p-8 text-center">Usuário não autenticado.</div>

  const handleChange = (fieldId: string, value: any) =>
    setAnswers((prev) => ({ ...prev, [fieldId]: value }))

  const handleSaveDraft = () => {
    saveDraft(template.id, answers)
    toast({ title: 'Rascunho salvo.' })
    navigate('/')
  }

  const handleSubmit = () => {
    if (hasHardErrors)
      return toast({
        title: 'Bloqueio de Validação',
        description: 'Corrija os campos em vermelho antes de finalizar.',
        variant: 'destructive',
      })

    const missing = template.fields.find((f) => {
      if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false
      if (f.required && !answers[f.id]) return true
      return false
    })

    if (missing)
      return toast({
        title: 'Campos obrigatórios',
        description: `Preencha os campos obrigatórios.`,
        variant: 'destructive',
      })

    // Simulate capturing GPS exact on signature if a signature exists
    let finalLocation = answers['gps_field'] || '-23.5505, -46.6333'

    submitAudit({
      id: `aud_${generateId().substring(0, 8)}`,
      templateId: template.id,
      templateName: template.name,
      operatorId: currentUser.id,
      operatorName: currentUser.name,
      operatorAvatar: currentUser.avatar,
      timestamp: new Date().toISOString(),
      status: 'Concluído',
      location: finalLocation,
      answers,
      approvalStatus: 'Pendente',
    })

    toast({ title: 'Auditoria Concluída', description: 'Dados salvos e sincronizados.' })
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
          if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue)
            return null
          return (
            <div key={field.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <FieldRenderer
                field={field}
                value={answers[field.id]}
                onChange={(v) => handleChange(field.id, v)}
                allAnswers={answers}
                error={hardValidationErrors[field.id]}
              />
            </div>
          )
        })}
      </div>

      <Card className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t md:left-[16rem] z-10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none">
        {hasHardErrors ? (
          <div className="flex items-center gap-2 text-destructive font-medium text-sm w-full sm:w-auto">
            <AlertOctagon className="h-5 w-5" /> Submissão Bloqueada (Regra de Negócio)
          </div>
        ) : (
          <div className="hidden sm:block text-sm text-muted-foreground">
            Tudo certo para envio.
          </div>
        )}

        <div className="flex gap-4 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none h-12 px-6"
          >
            <Save className="h-4 w-4 mr-2" /> Rascunho
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={hasHardErrors}
            className="flex-1 sm:flex-none gap-2 h-12 px-8 bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:bg-muted disabled:text-muted-foreground"
          >
            <Send className="h-4 w-4" /> Finalizar
          </Button>
        </div>
      </Card>
    </div>
  )
}
