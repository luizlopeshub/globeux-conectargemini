import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, PlayCircle, Clock, Calendar, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { useState } from 'react'

export function OperatorDashboard() {
  const { templates, drafts, currentUser, tasks } = useAppStore()
  const [search, setSearch] = useState('')

  const pendingTasks = tasks.filter((t) => t.user_id === currentUser?.id && t.status === 'pending')

  const filteredTasks = pendingTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredTemplates = templates.filter((t) => {
    if (!t.name.toLowerCase().includes(search.toLowerCase())) return false
    const noUsers = !t.assignedUsers || t.assignedUsers.length === 0
    const noDepts = !t.assignedDepartments || t.assignedDepartments.length === 0
    if (noUsers && noDepts) return true
    if (t.assignedUsers?.includes(currentUser?.id || '')) return true
    if (currentUser?.department && t.assignedDepartments?.includes(currentUser.department))
      return true
    return false
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tarefas ou checklists..."
          className="pl-9 h-12 bg-white shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Minhas Tarefas Pendentes
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="flex flex-col hover:shadow-elevation transition-shadow border-emerald-100 bg-emerald-50/30"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{task.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-emerald-100 text-emerald-800 border-emerald-200 whitespace-nowrap"
                    >
                      Agendada
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    Vencimento: {new Date(task.due_date).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  >
                    <Link to={`/execute/${task.template_id}?taskId=${task.id}`}>
                      <PlayCircle className="h-4 w-4" />
                      Iniciar Tarefa
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Auditorias Avulsas Disponíveis
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const hasDraft = !!drafts[template.id]
            return (
              <Card
                key={template.id}
                className="flex flex-col hover:shadow-elevation transition-shadow border-muted"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                    {hasDraft && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Rascunho
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Atualizado recentemente</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white gap-2"
                  >
                    <Link to={`/execute/${template.id}`}>
                      <PlayCircle className="h-4 w-4" />
                      {hasDraft ? 'Continuar Rascunho' : 'Iniciar Auditoria'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
              Nenhum checklist atribuído a você no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
