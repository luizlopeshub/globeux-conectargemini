import { useState, useEffect } from 'react'
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
import { toast } from '@/hooks/use-toast'
import { Plus, Pencil, ShieldAlert, Loader2, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { User } from '@/types'
import pb from '@/lib/pocketbase/client'
import { extractFieldErrors, getErrorMessage, type FieldErrors } from '@/lib/pocketbase/errors'

const DEPARTMENTS = ['Nenhum', 'Recebimento', 'Expedição', 'Químicos', 'Qualidade']

export default function Users() {
  const { users, currentUser, fetchInitialData } = useAppStore()
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [canDelete, setCanDelete] = useState<boolean | null>(null)

  useEffect(() => {
    if (editingUser?.id) {
      setCanDelete(null)
      Promise.all([
        pb.collection('responses').getList(1, 1, { filter: `user_id="${editingUser.id}"` }),
        pb.collection('tasks').getList(1, 1, { filter: `user_id="${editingUser.id}"` }),
        pb.collection('schedules').getList(1, 1, { filter: `assigned_to="${editingUser.id}"` }),
        pb
          .collection('action_plans')
          .getList(1, 1, { filter: `responsible_id="${editingUser.id}"` }),
      ])
        .then(([responses, tasks, schedules, action_plans]) => {
          setCanDelete(
            responses.totalItems +
              tasks.totalItems +
              schedules.totalItems +
              action_plans.totalItems ===
              0,
          )
        })
        .catch(() => setCanDelete(false))
    } else {
      setCanDelete(true)
    }
  }, [editingUser?.id])

  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-4">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <p>Acesso negado. Apenas administradores podem gerenciar usuários.</p>
      </div>
    )
  }

  const getAvatarUrl = (user: Partial<User>) => {
    if (user?.avatar && typeof user.avatar === 'string') {
      if (user.avatar.startsWith('http')) return user.avatar
      if (user.id)
        return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}?thumb=100x100`
    }
    return `https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || user?.name || 'default'}`
  }

  const handleSave = async () => {
    setFieldErrors({})
    if (!editingUser?.name || !editingUser?.email) {
      return toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' })
    }

    if (!editingUser.id && (!password || !passwordConfirm)) {
      return toast({
        title: 'A senha é obrigatória para novos utilizadores',
        variant: 'destructive',
      })
    }

    if (password !== passwordConfirm) {
      return toast({ title: 'As senhas não coincidem', variant: 'destructive' })
    }

    setIsLoading(true)
    try {
      const dept = editingUser.department === 'Nenhum' ? '' : editingUser.department

      const formData = new FormData()
      formData.append('name', editingUser.name)
      formData.append('active', editingUser.active !== false ? 'true' : 'false')
      formData.append('email', editingUser.email)
      formData.append('role', editingUser.role || 'user')
      formData.append('department', dept || '')

      if (password) {
        formData.append('password', password)
        formData.append('passwordConfirm', passwordConfirm)
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile)
      } else if (!editingUser.id) {
        formData.append('avatar', '')
      }

      if (editingUser.id) {
        await pb.collection('users').update(editingUser.id, formData)
        toast({ title: 'Utilizador atualizado com sucesso' })
      } else {
        await pb.collection('users').create(formData)
        toast({ title: 'Utilizador criado com sucesso' })
      }

      setEditingUser(null)
      setAvatarFile(null)
      setPassword('')
      setPasswordConfirm('')
      if (fetchInitialData) await fetchInitialData()
    } catch (err) {
      const errors = extractFieldErrors(err)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        toast({
          title: 'Erro de validação',
          description: 'Verifique os campos destacados.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro ao salvar',
          description: getErrorMessage(err),
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!editingUser?.id) return
    if (
      !confirm(
        'Tem certeza que deseja excluir permanentemente este utilizador? Esta ação não pode ser desfeita.',
      )
    )
      return

    setIsLoading(true)
    try {
      await pb.collection('users').delete(editingUser.id)
      toast({ title: 'Utilizador excluído com sucesso' })
      setEditingUser(null)
      if (fetchInitialData) await fetchInitialData()
    } catch (err) {
      toast({ title: 'Erro ao excluir', description: getErrorMessage(err), variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Utilizadores</h1>
          <p className="text-muted-foreground">Controle de acesso (RBAC) e departamentos.</p>
        </div>
        <Button
          onClick={() => setEditingUser({ role: 'user', department: 'Nenhum' })}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Novo Utilizador
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Utilizador</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Nenhum utilizador encontrado
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={getAvatarUrl(user)} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.active === false
                        ? 'bg-muted text-muted-foreground hover:bg-muted'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                  >
                    {user.active === false ? 'Inativo' : 'Ativo'}
                  </Badge>
                </TableCell>
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

      <Dialog
        open={!!editingUser}
        onOpenChange={(o) => {
          if (!o) {
            setEditingUser(null)
            setAvatarFile(null)
            setPassword('')
            setPasswordConfirm('')
            setFieldErrors({})
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser?.id ? 'Editar' : 'Novo'} Utilizador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {editingUser?.id && (
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Utilizador Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite ou bloqueia o acesso do utilizador ao sistema.
                  </p>
                </div>
                <Switch
                  checked={editingUser.active !== false}
                  onCheckedChange={(v) => setEditingUser((prev) => ({ ...prev!, active: v }))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Foto de Perfil</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarFile ? URL.createObjectURL(avatarFile) : getAvatarUrl(editingUser)}
                  />
                  <AvatarFallback>{editingUser?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    className={fieldErrors.avatar ? 'border-destructive' : ''}
                  />
                  {fieldErrors.avatar && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.avatar}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className={fieldErrors.name ? 'text-destructive' : ''}>Nome Completo</Label>
              <Input
                value={editingUser?.name || ''}
                onChange={(e) => setEditingUser((prev) => ({ ...prev!, name: e.target.value }))}
                className={fieldErrors.name ? 'border-destructive' : ''}
              />
              {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className={fieldErrors.email ? 'text-destructive' : ''}>Email</Label>
              <Input
                type="email"
                value={editingUser?.email || ''}
                onChange={(e) => setEditingUser((prev) => ({ ...prev!, email: e.target.value }))}
                className={fieldErrors.email ? 'border-destructive' : ''}
              />
              {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Senha {!editingUser?.id && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingUser?.id ? 'Deixe em branco para manter' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Confirmar Senha {!editingUser?.id && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder={editingUser?.id ? 'Deixe em branco para manter' : ''}
                />
              </div>
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
                    <SelectItem value="user">Utilizador</SelectItem>
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
          <DialogFooter className="sm:justify-between">
            {editingUser?.id ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={canDelete === false || isLoading}
                title={
                  canDelete === false
                    ? 'O utilizador possui registos vinculados. Inative a conta em vez de excluir.'
                    : ''
                }
              >
                {canDelete === null ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Excluir
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingUser(null)
                  setAvatarFile(null)
                  setPassword('')
                  setPasswordConfirm('')
                  setFieldErrors({})
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
