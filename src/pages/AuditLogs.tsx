import useAppStore from '@/stores/useAppStore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Download, FileText, CheckCircle, XCircle, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Audit } from '@/types'

export default function AuditLogs() {
  const { audits, currentUser, approveAudit } = useAppStore()
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null)

  const isSupervisorOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'supervisor'

  const handleApprove = (auditId: string, status: 'Aprovado' | 'Rejeitado') => {
    approveAudit(auditId, status, currentUser?.name || 'Sistema')
    toast({ title: `Auditoria ${status}`, description: `Status atualizado com sucesso.` })
    setSelectedAudit(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Logs e Aprovações</h1>
          <p className="text-muted-foreground">Registro imutável e validação de auditorias.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exportar (CSV)
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Checklist</TableHead>
              <TableHead>Operador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status / Aprovação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.templateName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={a.operatorAvatar} />
                      <AvatarFallback>{a.operatorName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{a.operatorName}</span>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(a.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      {a.status}
                    </Badge>
                    {a.approvalStatus === 'Pendente' && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        Pendente
                      </Badge>
                    )}
                    {a.approvalStatus === 'Aprovado' && (
                      <Badge variant="default" className="bg-emerald-500">
                        Aprovado
                      </Badge>
                    )}
                    {a.approvalStatus === 'Rejeitado' && (
                      <Badge variant="destructive">Rejeitado</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAudit(a)}>
                    <FileText className="h-4 w-4 mr-2" /> Visualizar Relatório
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {audits.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhuma auditoria registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedAudit} onOpenChange={(o) => !o && setSelectedAudit(null)}>
        <DialogContent className="max-w-3xl bg-slate-100 p-4 sm:p-8">
          <DialogHeader className="sr-only">
            <DialogTitle>Relatório de Auditoria</DialogTitle>
          </DialogHeader>
          {selectedAudit && (
            <div className="bg-white p-6 sm:p-10 border rounded shadow-lg text-sm space-y-8 relative">
              {selectedAudit.approvalStatus === 'Aprovado' && (
                <div className="absolute top-4 right-4 border-4 border-emerald-500 text-emerald-500 font-bold uppercase tracking-widest px-4 py-1 transform rotate-12 opacity-80 rounded">
                  Aprovado
                </div>
              )}
              {selectedAudit.approvalStatus === 'Rejeitado' && (
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
                    {selectedAudit.templateName}
                  </h2>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    REF: {selectedAudit.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src={selectedAudit.operatorAvatar} />
                    <AvatarFallback>{selectedAudit.operatorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wider">
                      Auditor Responsável
                    </span>
                    <span className="font-bold text-base text-slate-900">
                      {selectedAudit.operatorName}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wider">
                    Data / Hora de Conclusão
                  </span>
                  <span className="font-bold text-base text-slate-900">
                    {format(new Date(selectedAudit.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b pb-2 text-slate-900">
                  Respostas Preenchidas
                </h3>
                <div className="grid grid-cols-1 gap-y-4">
                  {Object.entries(selectedAudit.answers).map(([key, val]) => {
                    const isImg = typeof val === 'string' && val.startsWith('http')
                    if (val === 'signed') return null // skip signature here
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
                            String(val)
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
                    <span className="font-bold text-sm text-slate-900">
                      {selectedAudit.operatorName}
                    </span>
                    <span className="text-xs text-slate-500">Assinado digitalmente via App</span>
                  </div>
                  <div className="flex-1 w-full bg-white p-4 rounded border shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/400/200?q=map')] opacity-20 bg-cover bg-center"></div>
                    <div className="relative z-10">
                      <div className="flex items-center text-blue-700 font-bold mb-2 gap-2">
                        <MapPin className="h-4 w-4" /> Localização Capturada
                      </div>
                      <p className="font-mono text-xs text-slate-600 mb-1">
                        LAT/LNG: {selectedAudit.location || '-23.5505, -46.6333'}
                      </p>
                      <p className="font-mono text-xs text-slate-600">PRECISÃO: ± 4 metros</p>
                    </div>
                  </div>
                </div>
              </div>

              {isSupervisorOrAdmin && selectedAudit.approvalStatus === 'Pendente' && (
                <div className="pt-8 flex justify-end gap-4 border-t mt-8">
                  <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleApprove(selectedAudit.id, 'Rejeitado')}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Rejeitar Auditoria
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApprove(selectedAudit.id, 'Aprovado')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Aprovar Relatório
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
