import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { FieldRenderer } from '@/components/executor/FieldRenderer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/hooks/use-toast'
import { generateId } from '@/lib/utils'
import { Send, ArrowRight, ArrowLeft, CheckCircle2, AlertOctagon } from 'lucide-react'

export default function Executor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(window.location.search)
  const taskId = searchParams.get('taskId')
  const { templates, drafts, saveDraft, submitAudit, currentUser, tasks, updateTask } =
    useAppStore()

  const template = templates.find((t) => t.id === id)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [savingStatus, setSavingStatus] = useState('')

  useEffect(() => {
    if (id && drafts[id]) {
      setAnswers(drafts[id].answers || {})
      setCurrentStep(drafts[id].step || 0)
      toast({ description: 'Rascunho recuperado. Retornando ao ponto salvo.' })
    }
  }, [id, drafts])

  const visibleBlocks = useMemo(() => {
    if (!template?.blocks) return []
    return template.blocks.filter((b) => {
      if (!b.logicDependsOn) return true
      return answers[b.logicDependsOn] === b.logicValue
    })
  }, [template, answers])

  useEffect(() => {
    if (visibleBlocks.length > 0 && currentStep >= visibleBlocks.length) {
      setCurrentStep(Math.max(0, visibleBlocks.length - 1))
    }
  }, [visibleBlocks.length, currentStep])

  useEffect(() => {
    if (template && Object.keys(answers).length > 0) {
      setSavingStatus('Salvando rascunho...')
      const timer = setTimeout(() => {
        saveDraft(template.id, { answers, step: currentStep })
        setSavingStatus('Rascunho salvo automaticamente')
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [answers, currentStep, template, saveDraft])

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

  const currentBlock = visibleBlocks[currentStep]
  const currentFields = template.fields.filter((f) => f.blockId === currentBlock?.id)
  const progressPercent = visibleBlocks.length
    ? ((currentStep + 1) / visibleBlocks.length) * 100
    : 0
  const isLastStep = currentStep === visibleBlocks.length - 1

  const validateCurrentBlock = () => {
    if (hasHardErrors) {
      toast({
        title: 'Bloqueio de Validação',
        description: 'Corrija os campos em vermelho antes de prosseguir.',
        variant: 'destructive',
      })
      return false
    }

    let isValid = true
    for (const f of currentFields) {
      if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) continue
      if (f.required && !answers[f.id]) {
        toast({ variant: 'destructive', description: `Preencha o campo obrigatório: ${f.label}` })
        isValid = false
        break
      }
    }
    return isValid
  }

  const handleNext = () => {
    if (!validateCurrentBlock()) return
    setCurrentStep((s) => s + 1)
  }

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  const handleSubmit = () => {
    if (!validateCurrentBlock()) return

    // Check all fields for required validation before final submit
    const missing = template.fields.find((f) => {
      if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false
      // Only check fields in visible blocks
      const blockIsVisible = visibleBlocks.some((b) => b.id === f.blockId)
      if (!blockIsVisible) return false
      if (f.required && !answers[f.id]) return true
      return false
    })

    if (missing) {
      return toast({
        title: 'Campos obrigatórios',
        description: `Existem campos obrigatórios não preenchidos em blocos anteriores.`,
        variant: 'destructive',
      })
    }

    const newAuditId = `aud_${generateId().substring(0, 8)}`
    submitAudit({
      id: newAuditId,
      templateId: template.id,
      templateName: template.name,
      operatorId: currentUser.id,
      operatorName: currentUser.name,
      operatorAvatar: currentUser.avatar,
      timestamp: new Date().toISOString(),
      status: 'Concluído',
      location: answers['gps_field'] || '-23.5505, -46.6333',
      answers,
      approvalStatus: 'Pendente',
    })

    if (taskId) {
      const taskToUpdate = tasks.find((t) => t.id === taskId)
      if (taskToUpdate) {
        updateTask({ ...taskToUpdate, status: 'completed' })
      }
    }

    toast({ title: 'Auditoria Concluída', description: 'Gerando PDF do relatório...' })

    navigate('/logs', { state: { autoPrintId: newAuditId } })
  }

  return (
    <div className="max-w-3xl mx-auto pb-28 pt-4">
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{template.name}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>
              Passo {currentStep + 1} de {visibleBlocks.length || 1}
            </span>
            <span className="text-primary">{Math.round(progressPercent)}% Concluído</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      {currentBlock && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-semibold border-b pb-2 text-primary">{currentBlock.name}</h2>
          {currentFields.map((field) => {
            if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue)
              return null
            return (
              <FieldRenderer
                key={field.id}
                field={field}
                value={answers[field.id]}
                onChange={(v) => setAnswers((p) => ({ ...p, [field.id]: v }))}
                allAnswers={answers}
                error={hardValidationErrors[field.id]}
              />
            )
          })}
          {currentFields.length === 0 && (
            <p className="text-muted-foreground italic p-4 text-center">
              Nenhum campo neste bloco.
            </p>
          )}
        </div>
      )}

      <Card className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t md:left-[16rem] z-10 flex flex-col shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none">
        {hasHardErrors && (
          <div className="flex items-center gap-2 text-destructive font-medium text-sm w-full mx-auto max-w-3xl mb-4">
            <AlertOctagon className="h-4 w-4" /> Submissão Bloqueada (Regra de Negócio)
          </div>
        )}
        <div className="flex justify-between items-center max-w-3xl w-full mx-auto gap-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="w-32 h-12"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Button>

          <div className="hidden sm:flex items-center text-xs text-muted-foreground font-medium flex-1 justify-center">
            {savingStatus && <CheckCircle2 className="h-3 w-3 text-emerald-500 mr-1" />}
            {savingStatus}
          </div>

          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={hasHardErrors}
              className="w-48 h-12 bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:bg-muted disabled:text-muted-foreground"
            >
              <Send className="h-4 w-4 mr-2" /> Finalizar e Gerar PDF
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={hasHardErrors} className="w-32 h-12">
              Próximo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
