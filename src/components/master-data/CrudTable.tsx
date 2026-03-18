import { useState } from 'react'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { generateId } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'

interface CrudProps {
  title: string
  entityType: 'clients' | 'products' | 'carriers'
  columns: { key: string; label: string }[]
}

export function CrudTable({ title, entityType, columns }: CrudProps) {
  const store = useAppStore()
  const data = store[entityType] as any[]
  const [open, setOpen] = useState(false)
  const [form, setFormData] = useState<any>({})

  const handleSave = () => {
    if (form.id) {
      store.updateEntity(entityType, form)
    } else {
      store.addEntity(entityType, { ...form, id: `md_${generateId().substring(0, 6)}` })
    }
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro mestre para checklists dinâmicos.
          </p>
        </div>
        <Button
          onClick={() => {
            setFormData({})
            setOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Cadastro
        </Button>
      </div>
      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((c) => (
                  <TableCell key={c.key}>{row[c.key]}</TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFormData(row)
                      setOpen(true)
                    }}
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => store.deleteEntity(entityType, row.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {form.id ? 'Editar Cadastro' : 'Novo Cadastro'} - {title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {columns.map((c) => (
              <div key={c.key} className="space-y-2">
                <Label>{c.label}</Label>
                <Input
                  value={form[c.key] || ''}
                  onChange={(e) => setFormData({ ...form, [c.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
