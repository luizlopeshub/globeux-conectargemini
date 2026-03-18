import { useState, useMemo } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AuditReportDialog } from '@/components/AuditReportDialog'
import { format } from 'date-fns'
import { FileText, FilterX, Download } from 'lucide-react'

export default function Reports() {
  const { audits, templates, entityDefs, entityRecords } = useAppStore()
  const [selectedTemplate, setSelectedTemplate] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedRef, setSelectedRef] = useState('all')
  const [searchDoc, setSearchDoc] = useState('')
  const [status, setStatus] = useState('all')
  const [selectedAudit, setSelectedAudit] = useState<any>(null)

  const filtered = useMemo(() => {
    return audits.filter((a) => {
      if (selectedTemplate !== 'all' && a.templateId !== selectedTemplate) return false
      if (status !== 'all' && a.status !== status && a.approvalStatus !== status) return false
      if (searchDoc && !a.id.toLowerCase().includes(searchDoc.toLowerCase())) return false
      if (selectedRef !== 'all') {
        const hasRef = Object.values(a.answers).includes(selectedRef)
        if (!hasRef) return false
      }
      if (dateFrom && new Date(a.timestamp) < new Date(dateFrom)) return false
      if (dateTo && new Date(a.timestamp) > new Date(new Date(dateTo).getTime() + 86400000))
        return false
      return true
    })
  }, [audits, selectedTemplate, status, searchDoc, selectedRef, dateFrom, dateTo])

  const resolveValue = (val: any) => {
    if (typeof val === 'string' && val.length > 0) {
      const record = entityRecords.find((r) => r.id === val)
      if (record) {
        const def = entityDefs.find((d) => d.id === record.entityId)
        return record[def?.fields[0]?.id || 'id'] || record.id
      }
    }
    return String(val)
  }

  const handleClear = () => {
    setSelectedTemplate('all')
    setDateFrom('')
    setDateTo('')
    setSelectedRef('all')
    setSearchDoc('')
    setStatus('all')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Relatórios e Consultas</h1>
          <p className="text-muted-foreground">
            Motor de busca avançado por integridade relacional.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exportar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-card p-4 rounded-lg border shadow-sm items-end">
        <div className="space-y-2 lg:col-span-2">
          <Label>Visão / Template</Label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Checklist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Visões</SelectItem>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status Geral</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
              <SelectItem value="Aprovado">Aprovado</SelectItem>
              <SelectItem value="Rejeitado">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Referência de Cadastro</Label>
          <Select value={selectedRef} onValueChange={setSelectedRef}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {entityDefs.map((def) => {
                const recs = entityRecords.filter((r) => r.entityId === def.id)
                if (recs.length === 0) return null
                return (
                  <SelectGroup key={def.id}>
                    <SelectLabel>{def.name}</SelectLabel>
                    {recs.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r[def.fields[0]?.id || 'id']}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Data Início</Label>
          <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="space-y-2 flex-1">
            <Label>Data Fim</Label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            title="Limpar Filtros"
            className="mt-7 text-muted-foreground"
          >
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Documento / REF</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Checklist</TableHead>
              <TableHead>Principais Registros Mestre</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => {
              const refs = Object.values(a.answers).filter(
                (v) =>
                  typeof v === 'string' &&
                  !v.includes('http') &&
                  entityRecords.some((r) => r.id === v),
              )
              const resolvedRefs = refs
                .map(resolveValue)
                .filter((r) => r !== String(refs[0]))
                .slice(0, 2)
                .join(' / ')
              return (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs">{a.id}</TableCell>
                  <TableCell>{format(new Date(a.timestamp), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="font-medium">{a.templateName}</TableCell>
                  <TableCell className="text-muted-foreground">{resolvedRefs || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAudit(a)}>
                      <FileText className="h-4 w-4 mr-2" /> Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum registro encontrado para estes filtros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AuditReportDialog
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
        showApproval={false}
      />
    </div>
  )
}
