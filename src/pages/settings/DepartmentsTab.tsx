import { useState, useEffect } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '@/services/departments'
import type { Department } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { extractFieldErrors, getErrorMessage } from '@/lib/pocketbase/errors'

export function DepartmentsTab() {
  const [items, setItems] = useState<Department[]>([])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const load = () => getDepartments().then(setItems).catch(console.error)

  useEffect(() => {
    load()
  }, [])

  useRealtime('departments', () => {
    load()
  })

  const handleSave = async () => {
    setErrors({})
    try {
      if (!name.trim()) {
        setErrors({ name: 'Nome é obrigatório' })
        return
      }

      setLoading(true)
      if (editingId) {
        await updateDepartment(editingId, { name: name.trim() })
        toast({ title: 'Sucesso', description: 'Departamento atualizado com sucesso.' })
      } else {
        await createDepartment({ name: name.trim() })
        toast({ title: 'Sucesso', description: 'Departamento criado com sucesso.' })
      }
      setOpen(false)
      load()
    } catch (e: any) {
      const fieldErrors = extractFieldErrors(e)
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
      } else {
        toast({ title: 'Erro', description: getErrorMessage(e), variant: 'destructive' })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este departamento?')) return
    try {
      await deleteDepartment(id)
      load()
      toast({ title: 'Sucesso', description: 'Departamento excluído.' })
    } catch (e: any) {
      toast({ title: 'Erro', description: getErrorMessage(e), variant: 'destructive' })
    }
  }

  const openModal = (item?: Department) => {
    setEditingId(item?.id || null)
    setName(item?.name || '')
    setErrors({})
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" /> Novo Departamento
        </Button>
      </div>

      <div className="border rounded-md bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openModal(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                  Nenhum departamento cadastrado. Clique em "Novo Departamento" para começar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar' : 'Novo'} Departamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Departamento</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Qualidade"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
