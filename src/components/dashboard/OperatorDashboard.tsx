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
import { Search, PlayCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { useState } from 'react'

export function OperatorDashboard() {
  const { templates, drafts, currentUser } = useAppStore()
  const [search, setSearch] = useState('')

  const filteredTemplates = templates.filter((t) => {
    // 1. Text Search filter
    if (!t.name.toLowerCase().includes(search.toLowerCase())) return false

    // 2. Attribution Filter logic
    const noUsers = !t.assignedUsers || t.assignedUsers.length === 0
    const noDepts = !t.assignedDepartments || t.assignedDepartments.length === 0

    // If it has NO assignments at all, it's public
    if (noUsers && noDepts) return true

    // If assigned to this specific user
    if (t.assignedUsers?.includes(currentUser?.id || '')) return true

    // If assigned to this user's department
    if (currentUser?.department && t.assignedDepartments?.includes(currentUser.department))
      return true

    return false
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar checklist por nome..."
          className="pl-9 h-12 bg-white shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
                <Button asChild className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white gap-2">
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
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Nenhum checklist atribuído a você no momento.
          </div>
        )}
      </div>
    </div>
  )
}
