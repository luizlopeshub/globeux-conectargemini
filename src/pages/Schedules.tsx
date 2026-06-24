import { useState } from 'react'
import { Plus, Pencil, Trash2, Clock, User as UserIcon } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
import { SmartLookup } from '@/components/ui/smart-lookup'
import type { Schedule } from '@/types'

export default function Schedules() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule, templates, users } = useAppStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  const [formData, setFormData] = useState({
    template_id: '',
    assigned_to: '',
    recurrence: 'daily',
    time: '08:00',
  })

  const handleOpenModal = (schedule?: Schedule) => {
    if (schedule) {
      setEditingSchedule(schedule)
      setFormData({
        template_id: schedule.template_id,
        assigned_to: schedule.assigned_to,
        recurrence: schedule.recurrence,
        time: schedule.time || '08:00',
      })
    } else {
      setEditingSchedule(null)
      setFormData({
        template_id: '',
        assigned_to: '',
        recurrence: 'daily',
        time: '08:00',
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    if (!formData.template_id || !formData.assigned_to || !formData.time) {
      toast({
        title: 'Erro de Validação',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    try {
      if (editingSchedule) {
        await updateSchedule({ ...editingSchedule, ...formData } as Schedule)
      } else {
        await addSchedule(formData)
      }
      setIsModalOpen(false)
    } catch (error) {
      // Errors are handled by global store
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este agendamento?')) {
      await deleteSchedule(id)
    }
  }

  const getTemplateName = (id: string) => templates.find((t) => t.id === id)?.name || 'Desconhecido'
  const getUserName = (id: string) => users.find((u) => u.id === id)?.name || 'Desconhecido'

  const recurrenceLabels: Record<string, string> = {
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
    custom: 'Personalizada',
  }

  return (
    <div className="space-y-6 p-8 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie tarefas recorrentes e auditorias automatizadas.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>{schedules.length} agendamento(s) configurado(s).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Operador</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">
                    {getTemplateName(schedule.template_id)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      {getUserName(schedule.assigned_to)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {recurrenceLabels[schedule.recurrence] || schedule.recurrence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {schedule.time || '08:00'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(schedule)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(schedule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {schedules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum agendamento encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingSchedule ? 'Editar Agendamento' : 'Novo Agendamento'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template">
                Template <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.template_id}
                onValueChange={(val) => setFormData({ ...formData, template_id: val })}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="operator">
                Operador (Smart Lookup) <span className="text-red-500">*</span>
              </Label>
              <SmartLookup
                options={users
                  .filter(
                    (u) => (u.role === 'operator' || u.role === 'supervisor') && u.active !== false,
                  )
                  .map((u) => ({
                    value: u.id,
                    label: u.name,
                    description: u.email,
                  }))}
                value={formData.assigned_to}
                onChange={(val) => setFormData({ ...formData, assigned_to: val })}
                placeholder="Selecione o operador"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recurrence">Frequência</Label>
              <Select
                value={formData.recurrence}
                onValueChange={(val) => setFormData({ ...formData, recurrence: val })}
              >
                <SelectTrigger id="recurrence">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diária</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time">
                Horário <span className="text-red-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
