import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts'
import useAppStore from '@/stores/useAppStore'
import { ClipboardCheck, AlertTriangle, Clock } from 'lucide-react'

const barData = [
  { month: 'Jan', completed: 186, failed: 80 },
  { month: 'Fev', completed: 305, failed: 200 },
  { month: 'Mar', completed: 237, failed: 120 },
  { month: 'Abr', completed: 73, failed: 190 },
  { month: 'Mai', completed: 209, failed: 130 },
  { month: 'Jun', completed: 214, failed: 140 },
]

const pieData = [
  { name: 'Pneus Avariados', value: 400, color: 'var(--chart-4)' },
  { name: 'Atraso na Doca', value: 300, color: 'var(--chart-2)' },
  { name: 'Lacre Violado', value: 300, color: 'var(--chart-5)' },
  { name: 'Outros', value: 200, color: 'var(--chart-1)' },
]

export function AdminDashboard() {
  const { templates, audits } = useAppStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates Ativos</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auditorias Concluídas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falhas Críticas (Hoje)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Auditorias (Concluídas vs Falhas)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: { label: 'Concluídas', color: 'hsl(var(--primary))' },
                failed: { label: 'Falhas', color: 'hsl(var(--destructive))' },
              }}
            >
              <BarChart accessibilityLayer data={barData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pontos Comuns de Falha</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer config={{}} className="aspect-square max-h-[300px]">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
