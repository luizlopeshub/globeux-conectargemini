import { DepartmentsTab } from './DepartmentsTab'

export default function Departments() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Departamentos</h1>
        <p className="text-muted-foreground">
          Gerencie as áreas da sua organização utilizadas no sistema.
        </p>
      </div>
      <DepartmentsTab />
    </div>
  )
}
