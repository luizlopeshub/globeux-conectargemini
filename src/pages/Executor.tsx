import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { FieldRenderer } from '@/components/executor/FieldRenderer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/hooks/use-toast'
import { generateId } from '@/lib/utils'
import {
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertOctagon,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function Executor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(window.location.search)
  const taskId = searchParams.get('taskId')
  const { templates, drafts, saveDraft, clearDraft, submitAudit, currentUser, tasks, updateTask } =
    useAppStore()

  const template = templates.find((t) => t.id === id)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [savingStatus, setSavingStatus] = useState('')
  const [uploadingCount, setUploadingCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  const handleUploadStart = () => setUploadingCount((prev) => prev + 1)
  const handleUploadEnd = () => setUploadingCount((prev) => Math.max(0, prev - 1))

  const draftRestoredRef = useRef<string | null>(null)

  useEffect(() => {
    if (id && drafts[id] && draftRestoredRef.current !== id) {
      const savedAnswers = drafts[id].answers || {}
      if (Object.keys(savedAnswers).length > 0) {
        setAnswers(savedAnswers)
        setCurrentStep(drafts[id].step || 0)
        toast({ description: 'Rascunho recuperado. Retornando ao ponto salvo.' })
      }
      draftRestoredRef.current = id
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

  const evaluatedRules = useMemo(() => {
    const state = {
      hidden: new Set<string>(),
      shownTargets: new Set<string>(),
      shownActive: new Set<string>(),
      required: new Set<string>(),
      alerts: {} as Record<string, string>,
      blocks: [] as string[],
      actionPlans: [] as { fieldId: string; responsibleId: string; description: string }[],
      escalate: false,
    }

    if (!template) return state

    template.fields.forEach((f) => {
      if (!f.logicRules) return
      f.logicRules.forEach((rule) => {
        if (rule.action === 'SHOW_FIELD' && rule.targetId) {
          state.shownTargets.add(rule.targetId)
        }

        const ans = answers[rule.sourceFieldId || f.id]
        let isMatch = false
        if (ans !== undefined && ans !== null && ans !== '') {
          switch (rule.condition) {
            case 'equals':
              isMatch = String(ans).toLowerCase() === String(rule.value).toLowerCase()
              break
            case 'not_equals':
              isMatch = String(ans).toLowerCase() !== String(rule.value).toLowerCase()
              break
            case 'greater_than':
              isMatch = Number(ans) > Number(rule.value)
              break
            case 'less_than':
              isMatch = Number(ans) < Number(rule.value)
              break
          }
        } else {
          if (rule.condition === 'not_equals' && rule.value) isMatch = true
        }

        if (isMatch) {
          switch (rule.action) {
            case 'HIDE_FIELD':
              if (rule.targetId) state.hidden.add(rule.targetId)
              break
            case 'SHOW_FIELD':
              if (rule.targetId) state.shownActive.add(rule.targetId)
              break
            case 'SET_REQUIRED':
              if (rule.targetId) state.required.add(rule.targetId)
              break
            case 'DISPLAY_ALERT':
              state.alerts[f.id] = rule.message || 'Atenção necessária com base na sua resposta.'
              break
            case 'BLOCK_SUBMIT':
              state.blocks.push(rule.message || 'Submissão bloqueada por uma regra de negócio.')
              break
            case 'CREATE_ACTION_PLAN':
              if (rule.responsibleId) {
                state.actionPlans.push({
                  fieldId: f.id,
                  responsibleId: rule.responsibleId,
                  description: `Plano gerado automaticamente por gatilho da resposta: ${ans}`,
                })
              }
              break
            case 'ESCALATE_APPROVAL':
              state.escalate = true
              break
          }
        }
      })
    })
    return state
  }, [answers, template])

  const hasHardErrors =
    Object.keys(hardValidationErrors).length > 0 || evaluatedRules.blocks.length > 0

  if (!template) return <div className="p-8 text-center">Template não encontrado.</div>
  if (!currentUser) return <div className="p-8 text-center">Usuário não autenticado.</div>

  const currentBlock = visibleBlocks[currentStep]

  const currentFields = template.fields.filter((f) => f.blockId === currentBlock?.id)

  const visibleCurrentFields = currentFields.filter((f) => {
    if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false
    if (evaluatedRules.hidden.has(f.id)) return false
    if (evaluatedRules.shownTargets.has(f.id) && !evaluatedRules.shownActive.has(f.id)) return false
    return true
  })

  const progressPercent = visibleBlocks.length
    ? ((currentStep + 1) / visibleBlocks.length) * 100
    : 0
  const isLastStep = currentStep === visibleBlocks.length - 1

  const validateCurrentBlock = () => {
    if (hasHardErrors) {
      toast({
        title: 'Bloqueio de Validação',
        description:
          evaluatedRules.blocks[0] || 'Corrija os campos em vermelho antes de prosseguir.',
        variant: 'destructive',
      })
      return false
    }

    let isValid = true
    for (const f of visibleCurrentFields) {
      const isRequired = f.required || evaluatedRules.required.has(f.id)
      if (isRequired && !answers[f.id]) {
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

  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    if (template) {
      clearDraft(template.id)
      draftRestoredRef.current = template.id // Prevent auto-recovering deleted draft
    }
    setSavingStatus('Formulário reiniciado')
    setIsResetDialogOpen(false)
    toast({
      title: 'Formulário Reiniciado',
      description: 'Todos os dados foram limpos com sucesso.',
    })
  }

  const handleSubmit = async () => {
    if (!validateCurrentBlock()) return

    if (evaluatedRules.blocks.length > 0) {
      return toast({
        title: 'Submissão Bloqueada',
        description: evaluatedRules.blocks[0],
        variant: 'destructive',
      })
    }

    const missing = template.fields.find((f) => {
      const blockIsVisible = visibleBlocks.some((b) => b.id === f.blockId)
      if (!blockIsVisible) return false

      if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false
      if (evaluatedRules.hidden.has(f.id)) return false
      if (evaluatedRules.shownTargets.has(f.id) && !evaluatedRules.shownActive.has(f.id))
        return false

      const isRequired = f.required || evaluatedRules.required.has(f.id)
      if (isRequired && !answers[f.id]) return true
      return false
    })

    if (missing) {
      return toast({
        title: 'Campos obrigatórios',
        description: `Existem campos obrigatórios não preenchidos em passos anteriores.`,
        variant: 'destructive',
      })
    }

    setIsSubmitting(true)
    const newAuditId = `aud_${generateId().substring(0, 8)}`

    const payloadAnswers = {
      ...answers,
      _metadata: {
        escalated: evaluatedRules.escalate,
        actionPlansCreated: evaluatedRules.actionPlans.length,
      },
    }

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
      answers: payloadAnswers,
      approvalStatus: evaluatedRules.escalate ? 'Pendente' : 'Pendente',
    })

    if (taskId) {
      const taskToUpdate = tasks.find((t) => t.id === taskId)
      if (taskToUpdate) {
        updateTask({ ...taskToUpdate, status: 'completed' })
      }
    }

    if (evaluatedRules.actionPlans.length > 0) {
      toast({ description: 'Gerando planos de ação automáticos...' })
      for (const plan of evaluatedRules.actionPlans) {
        try {
          await pb.collection('action_plans').create({
            field_id: plan.fieldId,
            responsible_id: plan.responsibleId,
            status: 'pending',
            description: plan.description,
          })

          await pb.collection('audit_logs').create({
            user_id: currentUser.id,
            action: 'CREATE_ACTION_PLAN',
            entity_name: 'action_plans',
            payload: plan,
          })
        } catch (err) {
          console.error('Falha ao criar plano de ação:', err)
        }
      }
    }

    setIsSubmitting(false)
    toast({ title: 'Auditoria Concluída', description: 'Salvando e gerando o relatório final...' })
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
          {visibleCurrentFields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={answers[field.id]}
              onChange={(v) => setAnswers((p) => ({ ...p, [field.id]: v }))}
              allAnswers={answers}
              error={hardValidationErrors[field.id]}
              alert={evaluatedRules.alerts[field.id]}
              dynamicRequired={evaluatedRules.required.has(field.id)}
              onUploadStart={handleUploadStart}
              onUploadEnd={handleUploadEnd}
            />
          ))}
          {visibleCurrentFields.length === 0 && (
            <p className="text-muted-foreground italic p-4 text-center">
              Nenhum campo visível neste bloco ou logicamente ocultos.
            </p>
          )}
        </div>
      )}

      <Card className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t md:left-[16rem] z-10 flex flex-col shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none">
        {hasHardErrors && (
          <div className="flex items-center gap-2 text-destructive font-medium text-sm w-full mx-auto max-w-3xl mb-4">
            <AlertOctagon className="h-4 w-4" />{' '}
            {evaluatedRules.blocks[0] || 'Submissão Bloqueada (Regra de Negócio)'}
          </div>
        )}
        <div className="flex justify-between items-center max-w-3xl w-full mx-auto gap-2 sm:gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0 || isSubmitting}
              className="w-20 sm:w-32 h-12"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-2" />{' '}
              <span className="hidden sm:inline">Voltar</span>
            </Button>

            <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="h-12 w-12 sm:w-auto px-0 sm:px-4 shrink-0"
                  title="Reiniciar Formulário"
                >
                  <RefreshCw className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Reiniciar Formulário</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Atenção</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deseja realmente reiniciar o formulário? Todos os dados preenchidos e rascunhos
                    locais serão perdidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Sim, reiniciar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="hidden md:flex items-center text-xs text-muted-foreground font-medium flex-1 justify-center">
            {savingStatus && <CheckCircle2 className="h-3 w-3 text-emerald-500 mr-1" />}
            {savingStatus}
          </div>

          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={hasHardErrors || uploadingCount > 0 || isSubmitting}
              className="w-48 h-12 bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:bg-muted disabled:text-muted-foreground transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Finalizando...
                </>
              ) : uploadingCount > 0 ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando Fotos...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Finalizar
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={hasHardErrors || uploadingCount > 0 || isSubmitting}
              className="w-32 h-12 transition-all"
            >
              {uploadingCount > 0 ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Upload...
                </>
              ) : (
                <>
                  Próximo <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
