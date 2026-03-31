import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { EntityDef, MasterDataEntry } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { ChevronRight, Database, Edit2, Plus, Trash2, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useRealtime } from '@/hooks/use-realtime'

export default function MasterDataRecords() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [entity, setEntity] = useState<EntityDef | null>(null)
  const [records, setRecords] = useState<MasterDataEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<MasterDataEntry | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    const fetchEntity = async () => {
      if (!slug) return
      try {
        const entityRecord = await pb
          .collection('entity_definitions')
          .getFirstListItem<EntityDef>(`slug="${slug}"`)
        setEntity(entityRecord)
      } catch (err) {
        toast({ title: 'Erro', description: 'Entidade não encontrada.', variant: 'destructive' })
        navigate('/master-data/config')
      }
    }
    fetchEntity()
  }, [slug, navigate, toast])

  const loadRecords = async () => {
    if (!entity) return
    try {
      const data = await pb.collection('master_data_entries').getFullList<MasterDataEntry>({
        filter: `entity_id="${entity.id}"`,
        sort: '-created',
      })
      setRecords(data)
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao carregar registros.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (entity) loadRecords()
  }, [entity])

  useRealtime(
    'master_data_entries',
    (e) => {
      if (e.record.entity_id === entity?.id) {
        loadRecords()
      }
    },
    !!entity,
  )

  const handleOpenDialog = (record?: MasterDataEntry) => {
    if (record) {
      setEditingRecord(record)
      setFormData(record.data || {})
    } else {
      setEditingRecord(null)
      setFormData({})
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!entity) return

    // Validar campos obrigatórios se existissem regras complexas, mas por enquanto, os campos base já ajudam
    for (const field of entity.fields) {
      if (!formData[field.name]) {
        toast({
          title: 'Atenção',
          description: `O campo ${field.name} é obrigatório.`,
          variant: 'destructive',
        })
        return
      }
    }

    setIsSaving(true)
    try {
      if (editingRecord) {
        await pb.collection('master_data_entries').update(editingRecord.id, {
          data: formData,
        })

        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'update',
            entity_name: entity.name,
            payload: formData,
          })
        } catch (logErr) {
          console.error(logErr)
        }

        toast({ title: 'Sucesso', description: 'Registro atualizado.' })
      } else {
        await pb.collection('master_data_entries').create({
          entity_id: entity.id,
          data: formData,
        })

        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'create',
            entity_name: entity.name,
            payload: formData,
          })
        } catch (logErr) {
          console.error(logErr)
        }

        toast({ title: 'Sucesso', description: 'Registro criado.' })
      }
      setIsDialogOpen(false)
    } catch (err) {
      toast({ title: 'Erro ao salvar', description: getErrorMessage(err), variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este registro?')) return
    try {
      // Data Integrity: Deletion Block
      const responses = await pb.collection('responses').getList(1, 1, {
        filter: `data ~ "${id}"`,
      })
      if (responses.items.length > 0) {
        toast({
          title: 'Atenção',
          description:
            'Este registro não pode ser excluído pois está vinculado a auditorias realizadas',
          variant: 'destructive',
        })
        return
      }

      const recordToDelete = records.find((r) => r.id === id)
      await pb.collection('master_data_entries').delete(id)

      try {
        await pb.collection('audit_logs').create({
          user_id: pb.authStore.record?.id,
          action: 'delete',
          entity_name: entity?.name || 'master_data',
          payload: recordToDelete ? recordToDelete.data : { id },
        })
      } catch (logErr) {
        console.error('Failed to write audit log', logErr)
      }

      toast({ title: 'Sucesso', description: 'Registro excluído.' })
    } catch (err) {
      toast({ title: 'Erro', description: getErrorMessage(err), variant: 'destructive' })
    }
  }

  if (!entity) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayFields = entity.fields.slice(0, 4)

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link to="/master-data/config" className="hover:text-primary flex items-center gap-1">
          <Database className="h-4 w-4" /> Dados Mestre
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground">{entity.name}</span>
      </div>

      <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar: {entity.name}</h1>
          <p className="text-muted-foreground">Adicione ou edite os registros desta entidade.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Registro
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {displayFields.map((f) => (
                  <TableHead key={f.id}>{f.name}</TableHead>
                ))}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={displayFields.length + 1} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : records.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={displayFields.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    {displayFields.map((f) => (
                      <TableCell key={f.id}>{record.data[f.name] || '-'}</TableCell>
                    ))}
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(record)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive hover:text-white"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? `Editar ${entity.name}` : `Novo ${entity.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {entity.fields.map((field) => {
              const isImmutable =
                editingRecord &&
                (field.name.toLowerCase() === 'nome' ||
                  field.name.toLowerCase() === 'documento/cpf')
              return (
                <div key={field.id} className="space-y-2">
                  <Label>{field.name}</Label>
                  <Input
                    type={
                      field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'
                    }
                    value={formData[field.name] || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                    }
                    placeholder={`Digite ${field.name.toLowerCase()}`}
                    disabled={!!isImmutable}
                  />
                  {isImmutable && (
                    <p className="text-xs text-muted-foreground">
                      Este campo não pode ser alterado após a criação.
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
