import { SubjectsTab } from './SubjectsTab'

export default function Subjects() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Assuntos</h1>
        <p className="text-muted-foreground">
          Gerencie os assuntos que categorizam os templates de auditoria.
        </p>
      </div>
      <SubjectsTab />
    </div>
  )
}
