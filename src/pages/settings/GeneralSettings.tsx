import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SubjectsTab } from './SubjectsTab'
import { DepartmentsTab } from './DepartmentsTab'

export default function GeneralSettings() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações Gerais</h1>
        <p className="text-muted-foreground">
          Gerencie tabelas mestres do sistema como Assuntos e Departamentos.
        </p>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subjects">Assuntos</TabsTrigger>
          <TabsTrigger value="departments">Departamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="subjects">
          <SubjectsTab />
        </TabsContent>
        <TabsContent value="departments">
          <DepartmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
