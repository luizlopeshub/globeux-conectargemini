import { format } from 'date-fns'
import { Audit } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, CheckCircle, XCircle, FileDown, Mail, Send, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'
import { useState } from 'react'
import { generatePDF } from '@/services/exportService'
import { toast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { SmartLookup } from '@/components/SmartLookup'

interface Props {
  audit: Audit | null
  onClose: () => void
  showApproval?: boolean
  onApprove?: (id: string, status: 'Aprovado' | 'Rejeitado') => void
}

export function AuditReportDialog({ audit, onClose, showApproval, onApprove }: Props) {
  const store = useAppStore()
  const { entityDefs, entityRecords, currentUser, templates, users } = store
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)

  const [showRejectModal, setShowRejectModal] = useState(false)
  const [apDescription, setApDescription] = useState('')
  const [apDueDate, setApDueDate] = useState('')
  const [apResponsible, setApResponsible] = useState('')
  const [isRejecting, setIsRejecting] = useState(false)

  if (!audit) return null

  const template = templates.find((t) => t.id === audit.templateId || t.name === audit.templateName)
  const isSupervisorOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'supervisor'

  const handleExportPDF = () => {
    if (!audit || !template) return
    generatePDF([audit], templates)
  }

  const handleSendEmail = async () => {
    if (!email) return
    setIsSending(true)
    try {
      await pb.send('/backend/v1/send-audit-email', {
        method: 'POST',
        body: JSON.stringify({ email, auditId: audit?.id }),
      })
      toast({
        title: 'E-mail enviado',
        description: `O relatório foi enfileirado para envio a ${email}.`,
      })
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao enviar e-mail.', variant: 'destructive' })
    } finally {
      setIsSending(false)
      setShowEmailForm(false)
      setEmail('')
    }
  }

  const handleRejectSubmit = async () => {
    if (!apDescription || !apDueDate || !apResponsible) {
      toast({
        title: 'Atenção',
        description: 'Preencha todos os campos do Plano de Ação',
        variant: 'destructive',
      })
      return
    }
    setIsRejecting(true)
    try {
      await store.addActionPlan({
        field_id: audit.id,
        task_id: audit.taskId || audit.id,
        responsible_id: apResponsible,
        status: 'open',
        description: apDescription,
        due_date: new Date(apDueDate).toISOString(),
      } as any)

      if (onApprove) onApprove(audit.id, 'Rejeitado')
      setShowRejectModal(false)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao criar plano de ação.', variant: 'destructive' })
    } finally {
      setIsRejecting(false)
    }
  }

  const resolveName = (val: any) => {
    if (typeof val === 'string' && val.length > 0) {
      const record = entityRecords?.find((r) => r.id === val)
      if (record) {
        const def = entityDefs?.find((d) => d.id === record.entityId)
        return record[def?.fields?.[0]?.id || 'id'] || record.id
      }
    }
    return String(val ?? '')
  }

  return (
    <>
      <Dialog open={!!audit && !showRejectModal} onOpenChange={(o) => !o && onClose()}>
        <style>{`
          @media print {
            body { background: white; }
            body > :not([data-radix-portal]) { display: none; }
            .fixed.inset-0.z-50.bg-black\\/80 { display: none !important; }
            [role="dialog"] { position: static !important; transform: none !important; box-shadow: none !important; border: none !important; width: 100% !important; max-width: 100% !important; }
            [role="dialog"] > button.absolute { display: none !important; }
            .print\\:hidden { display: none !important; }
            .print\\:break-inside-avoid { break-inside: avoid; }
          }
        `}</style>
        <DialogContent className="max-w-3xl bg-slate-100 p-4 sm:p-8 print:max-w-none print:w-full print:bg-white print:p-0 print:m-0 print:border-none print:shadow-none print:h-auto print:overflow-visible">
          <DialogHeader className="sr-only print:hidden">
            <DialogTitle>Relatório de Auditoria</DialogTitle>
          </DialogHeader>
          <div className="bg-white p-6 sm:p-10 border rounded shadow-lg text-sm space-y-8 relative print:border-none print:shadow-none print:p-0">
            {audit.approvalStatus === 'Aprovado' && (
              <div className="absolute top-4 right-4 border-4 border-emerald-500 text-emerald-500 font-bold uppercase tracking-widest px-4 py-1 transform rotate-12 opacity-80 rounded">
                Aprovado
              </div>
            )}
            {audit.approvalStatus === 'Rejeitado' && (
              <div className="absolute top-4 right-4 border-4 border-destructive text-destructive font-bold uppercase tracking-widest px-4 py-1 transform rotate-12 opacity-80 rounded">
                Rejeitado
              </div>
            )}

            <div className="flex justify-between items-start border-b-2 border-primary pb-6 print:pb-4">
              <div>
                <img
                  src="https://img.usecurling.com/i?q=logistics&color=solid-black&shape=lineal-color"
                  alt="Logo"
                  className="h-10 mb-4 print:h-8"
                />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight print:text-xl">
                  {audit.templateName}
                </h2>
                <p className="text-muted-foreground mt-1 font-mono text-xs">REF: {audit.id}</p>
                {template?.subject && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    <span className="font-semibold">Assunto:</span> {template.subject}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 print:hidden">
                {showEmailForm ? (
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded border">
                    <Input
                      placeholder="email@destino.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-8 w-48 text-sm"
                    />
                    <Button size="sm" onClick={handleSendEmail} disabled={isSending}>
                      {isSending ? 'Enviando...' : <Send className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowEmailForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowEmailForm(true)}>
                      <Mail className="h-4 w-4 mr-2" /> Enviar por E-mail
                    </Button>
                    <Button variant="default" size="sm" onClick={handleExportPDF}>
                      <FileDown className="h-4 w-4 mr-2" /> Baixar PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={audit.operatorAvatar} />
                  <AvatarFallback>{audit.operatorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wider">
                    Auditor Responsável
                  </span>
                  <span className="font-bold text-base text-slate-900">{audit.operatorName}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wider">
                  Data / Hora de Conclusão
                </span>
                <span className="font-bold text-base text-slate-900">
                  {format(new Date(audit.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-lg border-b pb-2 text-slate-900 print:text-base">
                Respostas Preenchidas
              </h3>

              {template && template.blocks ? (
                template.blocks.map((block: any) => {
                  const blockFields =
                    template.fields?.filter((f: any) => f.blockId === block.id) || []
                  const hasAnswers = blockFields.some((f: any) => audit.answers[f.id] !== undefined)

                  if (!hasAnswers) return null

                  return (
                    <div key={block.id} className="mb-6 print:mb-4 print:break-inside-avoid">
                      <h4 className="font-semibold text-md text-slate-800 bg-slate-100 p-2 rounded mb-3 print:bg-slate-50 print:border">
                        {block.name}
                      </h4>
                      <div className="grid grid-cols-1 gap-y-3 px-2">
                        {blockFields.map((field: any) => {
                          const val = audit.answers[field.id]
                          if (val === undefined || val === 'signed') return null

                          const isImg = typeof val === 'string' && val.startsWith('http')
                          let displayVal = val

                          if (field.type === 'choice' || field.type === 'select') {
                            if (
                              Array.isArray(field.options) &&
                              typeof field.options[0] === 'object'
                            ) {
                              const opt = field.options.find((o: any) => o.value === val)
                              displayVal = opt ? opt.label : val
                            }
                          }

                          return (
                            <div
                              key={field.id}
                              className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-dashed border-slate-200 last:border-0"
                            >
                              <span className="text-slate-600 font-medium w-1/3 mb-1 sm:mb-0 print:text-sm">
                                {field.label}
                              </span>
                              <div className="font-semibold text-slate-900 sm:text-right flex-1 break-words print:text-sm">
                                {isImg ? (
                                  <img
                                    src={val}
                                    alt="Anexo"
                                    className="h-24 sm:h-32 rounded border shadow-sm sm:ml-auto object-cover print:h-20"
                                  />
                                ) : (
                                  resolveName(displayVal)
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="grid grid-cols-1 gap-y-4">
                  {Object.entries(audit.answers).map(([key, val]) => {
                    const isImg = typeof val === 'string' && val.startsWith('http')
                    if (val === 'signed') return null
                    return (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-dashed border-slate-200 last:border-0 print:py-2"
                      >
                        <span className="text-slate-500 font-medium w-1/3 mb-1 sm:mb-0 print:text-sm">
                          {key.replace(/f[0-9]+/, 'Campo ')}
                        </span>
                        <div className="font-semibold text-slate-900 sm:text-right flex-1 break-words print:text-sm">
                          {isImg ? (
                            <img
                              src={val}
                              alt="Anexo"
                              className="h-24 sm:h-32 rounded border shadow-sm sm:ml-auto object-cover print:h-20"
                            />
                          ) : (
                            resolveName(val)
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="mt-8 border-t-2 pt-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4">
                Assinatura Digital & Geo-rastreamento
              </h3>
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full flex flex-col items-center">
                  <img
                    src="https://img.usecurling.com/i?q=signature&shape=hand-drawn"
                    alt="Assinatura"
                    className="h-16 opacity-80"
                  />
                  <div className="h-px w-3/4 bg-slate-300 my-2"></div>
                  <span className="font-bold text-sm text-slate-900">{audit.operatorName}</span>
                  <span className="text-xs text-slate-500">Assinado digitalmente via App</span>
                </div>
                <div className="flex-1 w-full bg-white p-4 rounded border shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/400/200?q=map')] opacity-20 bg-cover bg-center"></div>
                  <div className="relative z-10">
                    <div className="flex items-center text-blue-700 font-bold mb-2 gap-2">
                      <MapPin className="h-4 w-4" /> Localização Capturada
                    </div>
                    <p className="font-mono text-xs text-slate-600 mb-1">
                      LAT/LNG: {audit.location || '-23.5505, -46.6333'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showApproval &&
              isSupervisorOrAdmin &&
              audit.approvalStatus === 'Pendente' &&
              onApprove && (
                <div className="pt-8 flex justify-end gap-4 border-t mt-8 print:hidden">
                  <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setShowRejectModal(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Rejeitar
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => onApprove(audit.id, 'Aprovado')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Aprovar
                  </Button>
                </div>
              )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Abertura de Pendência
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Motivo / Descrição da Falha</Label>
              <textarea
                className="w-full min-h-[100px] p-3 border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder="Descreva o motivo da rejeição e o que precisa ser corrigido..."
                value={apDescription}
                onChange={(e) => setApDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Prazo de Resolução</Label>
              <Input type="date" value={apDueDate} onChange={(e) => setApDueDate(e.target.value)} />
            </div>
            <div className="space-y-2 flex flex-col">
              <Label>Responsável</Label>
              <SmartLookup
                options={[
                  { value: audit.operatorId, label: `${audit.operatorName} (Auditor Original)` },
                  ...(users || [])
                    .filter((u) => u.id !== audit.operatorId)
                    .map((u) => ({ value: u.id, label: `${u.name} (${u.role})` })),
                ]}
                value={apResponsible}
                onChange={setApResponsible}
                placeholder="Selecione um responsável..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleRejectSubmit} disabled={isRejecting}>
                {isRejecting ? 'Salvando...' : 'Confirmar Rejeição'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
