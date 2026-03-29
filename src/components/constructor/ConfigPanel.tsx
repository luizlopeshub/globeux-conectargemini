import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import useAppStore from '@/stores/useAppStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  subjectId?: string
  assignedUsers: string[]
  assignedDepartments: string[]
  onChange: (users: string[], depts: string[], subjectId?: string) => void
}

export function ConfigPanel({ subjectId, assignedUsers, assignedDepartments, onChange }: Props) {
  const { users, departments, subjects } = useAppStore()
  const operators = users.filter((u) => u.role === 'operator')

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 pb-6">
      <div className="space-y-2 pb-4">
        <h3 className="font-medium text-sm">Assunto (Obrigatório)</h3>
        <Select
          value={subjectId || ''}
          onValueChange={(val) => onChange(assignedUsers, assignedDepartments, val)}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecione o assunto" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 border-t pt-4">
        <h3 className="font-medium text-sm">Atribuir a Departamentos</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Qualquer operador nestes departamentos verá o checklist.
        </p>
        <div className="border rounded-md p-2 space-y-2 bg-background max-h-48 overflow-y-auto">
          {departments.length === 0 ? (
            <p className="text-xs text-muted-foreground p-2">Nenhum departamento cadastrado.</p>
          ) : (
            departments.map((d) => (
              <div key={d.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`dept-${d.id}`}
                  checked={assignedDepartments.includes(d.id)}
                  onCheckedChange={(c) => {
                    onChange(
                      assignedUsers,
                      c
                        ? [...assignedDepartments, d.id]
                        : assignedDepartments.filter((id) => id !== d.id),
                      subjectId,
                    )
                  }}
                />
                <label
                  htmlFor={`dept-${d.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {d.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <h3 className="font-medium text-sm">Atribuir a Usuários Específicos</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Apenas estes operadores específicos verão o checklist.
        </p>
        <div className="border rounded-md p-2 max-h-48 overflow-y-auto space-y-2 bg-background">
          {operators.length === 0 ? (
            <p className="text-xs text-muted-foreground p-2">Nenhum operador encontrado.</p>
          ) : (
            operators.map((u) => (
              <div key={u.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`usr-${u.id}`}
                  checked={assignedUsers.includes(u.id)}
                  onCheckedChange={(c) => {
                    onChange(
                      c ? [...assignedUsers, u.id] : assignedUsers.filter((id) => id !== u.id),
                      assignedDepartments,
                      subjectId,
                    )
                  }}
                />
                <label
                  htmlFor={`usr-${u.id}`}
                  className="text-sm font-medium leading-none cursor-pointer truncate"
                >
                  {u.name}{' '}
                  <span className="text-muted-foreground font-normal text-xs">
                    ({u.department || 'Sem depto'})
                  </span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
      <p className="text-xs bg-blue-50 text-blue-800 p-3 rounded-md">
        Se nenhum departamento ou usuário for selecionado, o checklist ficará disponível para{' '}
        <b>todos os operadores</b>.
      </p>
    </div>
  )
}
