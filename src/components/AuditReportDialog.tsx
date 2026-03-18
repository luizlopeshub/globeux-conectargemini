import { format } from 'date-fns'
import { Audit } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'

interface Props {
  audit: Audit | null
  onClose: () => void
  showApproval?: boolean
  onApprove?: (id: string, status: 'Aprovado' | 'Rejeitado') => void
}

export function AuditReportDialog({ audit, onClose, showApproval, onApprove }: Props) {
  const { entityDefs, entityRecords, currentUser } = useAppStore()
  if (!audit) return null

  const isSupervisorOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'supervisor'

  const resolveName = (val: any) => {
    if (typeof val === 'string' && val.length > 0) {
      const record = entityRecords.find((r) => r.id === val)
      if (record) {
        const def = entityDefs.find((d) => d.id === record.entityId)
        return record[def?.fields[0]?.id || 'id'] || record.id
      }
    }
    return String(val)
  }

  return (
    <Dialog open={!!audit} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl bg-slate-100 p-4 sm:p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>Relatório de Auditoria</DialogTitle>
        </DialogHeader>
        <div className="bg-white p-6 sm:p-10 border rounded shadow-lg text-sm space-y-8 relative">
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

          <div className="flex justify-between items-start border-b-2 border-primary pb-6">
            <div>
              <img
                src="https://img.usecurling.com/i?q=logistics&color=solid-black&shape=lineal-color"
                alt="Logo"
                className="h-10 mb-4"
              />
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {audit.templateName}
              </h2>
              <p className="text-muted-foreground mt-1 font-mono text-xs">REF: {audit.id}</p>
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

          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2 text-slate-900">
              Respostas Preenchidas
            </h3>
            <div className="grid grid-cols-1 gap-y-4">
              {Object.entries(audit.answers).map(([key, val]) => {
                const isImg = typeof val === 'string' && val.startsWith('http')
                if (val === 'signed') return null
                return (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-dashed border-slate-200 last:border-0"
                  >
                    <span className="text-slate-500 font-medium w-1/3 mb-1 sm:mb-0">
                      {key.replace(/f[0-9]+/, 'Campo ')}
                    </span>
                    <div className="font-semibold text-slate-900 sm:text-right flex-1 break-words">
                      {isImg ? (
                        <img
                          src={val}
                          alt="Anexo"
                          className="h-24 sm:h-32 rounded border shadow-sm sm:ml-auto"
                        />
                      ) : (
                        resolveName(val)
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
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
              <div className="pt-8 flex justify-end gap-4 border-t mt-8">
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => onApprove(audit.id, 'Rejeitado')}
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
  )
}
