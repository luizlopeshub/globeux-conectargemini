import { useState } from 'react'
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
import { Download, FileText, FileDown } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/hooks/use-toast'
import { Audit } from '@/types'
import { AuditReportDialog } from '@/components/AuditReportDialog'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function AuditLogs() {
  const { audits, currentUser, approveAudit } = useAppStore()
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null)
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { autoPrintId?: string }
    if (state?.autoPrintId && audits.length > 0) {
      const auditToPrint = audits.find((a) => a.id === state.autoPrintId)
      if (auditToPrint) {
        setSelectedAudit(auditToPrint)
        setTimeout(() => {
          const btn = document.getElementById('btn-export-pdf')
          if (btn) btn.click()
        }, 500)
      }
      // Clean up state
      window.history.replaceState({}, document.title)
    }
  }, [location.state, audits])

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
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAudit(a)}>
                      <FileText className="h-4 w-4 mr-2" /> Relatório
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAudit(a)
                        setTimeout(() => {
                          const btn = document.getElementById('btn-export-pdf')
                          if (btn) btn.click()
                        }, 300)
                      }}
                    >
                      <FileDown className="h-4 w-4 mr-2" /> PDF
                    </Button>
                  </div>
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

      <AuditReportDialog
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
        showApproval={true}
        onApprove={handleApprove}
      />
    </div>
  )
}
