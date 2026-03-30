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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { generateId } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Plus, Pencil, ShieldAlert } from 'lucide-react'
import { User } from '@/types'

const DEPARTMENTS = ['Nenhum', 'Recebimento', 'Expedição', 'Químicos', 'Qualidade']

export default function Users() {
  const { users, addUser, updateUser, currentUser } = useAppStore()
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null)

  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-4">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <p>Acesso negado. Apenas administradores podem gerenciar usuários.</p>
      </div>
    )
  }

  const handleSave = () => {
    if (!editingUser?.name || !editingUser?.email)
      return toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' })

    const dept = editingUser.department === 'Nenhum' ? undefined : editingUser.department

    if (editingUser.id) {
      updateUser(editingUser.id, { ...editingUser, department: dept })
    } else {
      addUser({
        ...editingUser,
        department: dept,
        avatar: `https://img.usecurling.com/ppl/thumbnail?seed=${generateId()}`,
      })
    }
    setEditingUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">Controle de acesso (RBAC) e departamentos.</p>
        </div>
        <Button
          onClick={() => setEditingUser({ role: 'operator', department: 'Nenhum' })}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role === 'admin'
                        ? 'destructive'
                        : user.role === 'supervisor'
                          ? 'default'
                          : 'secondary'
                    }
                    className="uppercase text-[10px]"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.department || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setEditingUser(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingUser} onOpenChange={(o) => !o && setEditingUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser?.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                value={editingUser?.name || ''}
                onChange={(e) => setEditingUser((prev) => ({ ...prev!, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editingUser?.email || ''}
                onChange={(e) => setEditingUser((prev) => ({ ...prev!, email: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nível de Acesso</Label>
                <Select
                  value={editingUser?.role || 'operator'}
                  onValueChange={(v) => setEditingUser((prev) => ({ ...prev!, role: v as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select
                  value={editingUser?.department || 'Nenhum'}
                  onValueChange={(v) => setEditingUser((prev) => ({ ...prev!, department: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
