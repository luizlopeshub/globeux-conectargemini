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
import { Download, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Audit } from '@/types'

export default function AuditLogs() {
  const { audits } = useAppStore()
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null)

  const handleExportCSV = () => {
    if (audits.length === 0) return
    const headers = ['ID', 'Template', 'Operador', 'Data', 'Status', 'Local']
    const rows = audits.map((a) => [
      a.id,
      a.templateName,
      a.operatorName,
      a.timestamp,
      a.status,
      a.location || 'N/A',
    ])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'auditorias.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: 'Exportado', description: 'Arquivo CSV baixado com sucesso.' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Logs de Auditoria</h1>
          <p className="text-muted-foreground">Registro imutável das auditorias realizadas.</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exportar Banco (CSV)
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>ID</TableHead>
              <TableHead>Checklist</TableHead>
              <TableHead>Operador</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className="font-mono text-xs">{audit.id}</TableCell>
                <TableCell className="font-medium">{audit.templateName}</TableCell>
                <TableCell>{audit.operatorName}</TableCell>
                <TableCell>{format(new Date(audit.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
                    {audit.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAudit(audit)}>
                    <FileText className="h-4 w-4 mr-2" /> Ver PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {audits.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhuma auditoria registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedAudit} onOpenChange={(o) => !o && setSelectedAudit(null)}>
        <DialogContent className="max-w-2xl bg-[#f8fafc]">
          <DialogHeader>
            <DialogTitle>Relatório de Auditoria</DialogTitle>
          </DialogHeader>
          {selectedAudit && (
            <div className="bg-white p-8 border rounded shadow-subtle text-sm space-y-6">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-primary">{selectedAudit.templateName}</h2>
                  <p className="text-muted-foreground mt-1">
                    ID: <span className="font-mono">{selectedAudit.id}</span>
                  </p>
                </div>
                <img
                  src="https://img.usecurling.com/i?q=logistics&color=solid-black&shape=lineal-color"
                  alt="Logo"
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded">
                <div>
                  <span className="text-muted-foreground block text-xs">Operador</span>
                  <span className="font-medium">{selectedAudit.operatorName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Data de Conclusão</span>
                  <span className="font-medium">
                    {format(new Date(selectedAudit.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                  </span>
                </div>
                {selectedAudit.location && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground block text-xs">Localização (GPS)</span>
                    <span className="font-mono">{selectedAudit.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold border-b pb-2">Respostas</h3>
                {Object.entries(selectedAudit.answers).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-dashed border-border last:border-0"
                  >
                    <span className="text-muted-foreground font-mono text-xs">{key}</span>
                    <span className="font-medium max-w-[60%] text-right break-words">
                      {typeof val === 'string' && val.startsWith('http') ? (
                        <img src={val} alt="Anexo" className="h-16 rounded mt-1" />
                      ) : (
                        String(val)
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex justify-center">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    toast({ description: 'Simulação de download de PDF iniciada.' })
                    setSelectedAudit(null)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" /> Baixar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
