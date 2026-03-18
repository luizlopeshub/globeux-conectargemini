import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AuditReportDialog } from '@/components/AuditReportDialog'
import { format } from 'date-fns'
import { FileText, FilterX, Download } from 'lucide-react'
import { SmartLookup } from '@/components/SmartLookup'

export default function Reports() {
  const { audits, templates, entityDefs, entityRecords } = useAppStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearchDoc = searchParams.get('searchDoc') || ''

  const [selectedTemplate, setSelectedTemplate] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedRef, setSelectedRef] = useState('')
  const [searchDoc, setSearchDoc] = useState(initialSearchDoc)
  const [status, setStatus] = useState('all')
  const [selectedAudit, setSelectedAudit] = useState<any>(null)
  const [visibleCount, setVisibleCount] = useState(20)

  useEffect(() => {
    if (initialSearchDoc) setSearchDoc(initialSearchDoc)
  }, [initialSearchDoc])

  const filtered = useMemo(() => {
    return audits.filter((a) => {
      if (selectedTemplate !== 'all' && a.templateId !== selectedTemplate) return false
      if (status !== 'all' && a.status !== status && a.approvalStatus !== status) return false
      if (searchDoc) {
        const term = searchDoc.toLowerCase()
        const matchId = a.id.toLowerCase().includes(term)
        const matchAnswers = Object.values(a.answers).some((val) =>
          String(val).toLowerCase().includes(term),
        )
        if (!matchId && !matchAnswers) return false
      }
      if (selectedRef) {
        const hasRef = Object.values(a.answers).includes(selectedRef)
        if (!hasRef) return false
      }
      if (dateFrom && new Date(a.timestamp) < new Date(dateFrom)) return false
      if (dateTo && new Date(a.timestamp) > new Date(new Date(dateTo).getTime() + 86400000))
        return false
      return true
    })
  }, [audits, selectedTemplate, status, searchDoc, selectedRef, dateFrom, dateTo])

  const paginated = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])

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
    setSelectedRef('')
    setSearchDoc('')
    setStatus('all')
    setSearchParams({})
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
          <Download className="h-4 w-4" /> Exportar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-card p-4 rounded-lg border shadow-sm items-end">
        <div className="space-y-2">
          <Label>Visão / Checklist</Label>
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
        <div className="space-y-2 md:col-span-2">
          <Label>Referência Mestre (Smart Lookup)</Label>
          <SmartLookup value={selectedRef} onChange={setSelectedRef} allowEntityChange={true} />
        </div>
        <div className="space-y-2">
          <Label>Busca Global</Label>
          <Input
            placeholder="Doc/NF ou Ref..."
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Data Início</Label>
          <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Data Fim</Label>
          <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleClear}
            className="w-full text-muted-foreground border border-input"
          >
            <FilterX className="h-4 w-4 mr-2" /> Limpar Filtros
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm flex flex-col">
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
            {paginated.map((a) => {
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
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum registro encontrado para estes filtros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {visibleCount < filtered.length && (
          <div className="p-4 flex justify-center border-t bg-muted/20">
            <Button variant="outline" onClick={() => setVisibleCount((v) => v + 20)}>
              Carregar Mais ({filtered.length - visibleCount} restantes)
            </Button>
          </div>
        )}
      </div>
      <AuditReportDialog
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
        showApproval={false}
      />
    </div>
  )
}
