import { Suspense, lazy, useState } from 'react'
import useAppStore from '@/stores/useAppStore'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, LayoutDashboard } from 'lucide-react'
import EventCalendar from '@/components/calendar/EventCalendar'

const AdminDashboard = lazy(() =>
  import('@/components/dashboard/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)
const OperatorDashboard = lazy(() =>
  import('@/components/dashboard/OperatorDashboard').then((m) => ({
    default: m.OperatorDashboard,
  })),
)

export default function Index() {
  const { role } = useAppStore()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar'>('dashboard')

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-3 mb-4 overflow-x-auto scrollbar-hide">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('dashboard')}
          className="gap-2 font-semibold shadow-none"
        >
          <LayoutDashboard className="w-4 h-4" />
          Visão Geral
        </Button>
        <Button
          variant={activeTab === 'calendar' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('calendar')}
          className="gap-2 font-semibold shadow-none"
        >
          <CalendarIcon className="w-4 h-4" />
          Calendário de Auditorias
        </Button>
      </div>

      {activeTab === 'dashboard' ? (
        <Suspense
          fallback={
            <div className="h-64 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            </div>
          }
        >
          {role === 'admin' ? <AdminDashboard /> : <OperatorDashboard />}
        </Suspense>
      ) : (
        <EventCalendar />
      )}
    </div>
  )
}
