import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { fetchCalendarEvents } from '@/services/calendar'
import type { CalendarEvent } from '@/types/calendar'
import { MonthView, WeekView, DayView } from './CalendarViews'

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const { currentUser } = useAppStore()

  useEffect(() => {
    if (!currentUser) return
    let mounted = true

    fetchCalendarEvents(currentUser.id, currentUser.role).then(({ tasks, plans }) => {
      if (!mounted) return
      const mappedTasks = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        date: new Date(t.due_date),
        type: 'task' as const,
        status: t.status,
        original: t,
      }))
      const mappedPlans = plans
        .filter((p) => p.due_date)
        .map((p) => ({
          id: p.id,
          title: p.description,
          date: new Date(p.due_date!),
          type: 'action_plan' as const,
          status: p.status,
          original: p,
        }))
      setEvents([...mappedTasks, ...mappedPlans])
    })

    return () => {
      mounted = false
    }
  }, [currentUser])

  const handlePrev = () => {
    if (view === 'month') setCurrentDate((d) => subMonths(d, 1))
    else if (view === 'week') setCurrentDate((d) => subWeeks(d, 1))
    else setCurrentDate((d) => subDays(d, 1))
  }

  const handleNext = () => {
    if (view === 'month') setCurrentDate((d) => addMonths(d, 1))
    else if (view === 'week') setCurrentDate((d) => addWeeks(d, 1))
    else setCurrentDate((d) => addDays(d, 1))
  }

  return (
    <div className="w-full bg-background rounded-lg border p-4 sm:p-6 shadow-sm animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className="flex items-center bg-muted/50 rounded-md p-1 border shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm shrink-0"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-sm px-3 font-medium text-xs sm:text-sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoje
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm shrink-0"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg sm:text-xl font-bold capitalize flex items-center gap-2 truncate">
            <CalendarIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="truncate">
              {view === 'month' && format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              {view === 'week' && `Semana de ${format(currentDate, 'dd/MM')}`}
              {view === 'day' && format(currentDate, "dd 'de' MMMM", { locale: ptBR })}
            </span>
          </h2>
        </div>

        <div className="flex bg-muted/50 p-1 rounded-md border shadow-sm w-full md:w-auto">
          <button
            onClick={() => setView('month')}
            className={cn(
              'flex-1 md:flex-none px-4 py-1.5 text-sm font-semibold rounded-sm transition-colors',
              view === 'month'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Mês
          </button>
          <button
            onClick={() => setView('week')}
            className={cn(
              'flex-1 md:flex-none px-4 py-1.5 text-sm font-semibold rounded-sm transition-colors',
              view === 'week'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Semana
          </button>
          <button
            onClick={() => setView('day')}
            className={cn(
              'flex-1 md:flex-none px-4 py-1.5 text-sm font-semibold rounded-sm transition-colors',
              view === 'day'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Dia
          </button>
        </div>
      </div>

      {view === 'month' && (
        <MonthView currentDate={currentDate} events={events} onEventClick={setSelectedEvent} />
      )}
      {view === 'week' && (
        <WeekView currentDate={currentDate} events={events} onEventClick={setSelectedEvent} />
      )}
      {view === 'day' && (
        <DayView currentDate={currentDate} events={events} onEventClick={setSelectedEvent} />
      )}

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl pr-6">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-muted-foreground text-sm font-medium">Tipo de Evento</span>
              <span
                className={cn(
                  'font-bold px-3 py-1 rounded-full text-xs shadow-sm',
                  selectedEvent?.type === 'task'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800',
                )}
              >
                {selectedEvent?.type === 'task'
                  ? 'Tarefa de Auditoria'
                  : 'Plano de Ação (Pendência)'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-muted-foreground text-sm font-medium">Status</span>
              <span className="font-bold capitalize bg-muted px-3 py-1 rounded-full text-xs">
                {selectedEvent?.status}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-muted-foreground text-sm font-medium">Data Prevista</span>
              <span className="font-semibold">
                {selectedEvent && format(selectedEvent.date, "dd/MM/yyyy 'às' HH:mm")}
              </span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancelar
            </Button>
            {selectedEvent?.type === 'task' && (
              <Button asChild>
                <Link to={`/execute/${selectedEvent.id}`}>Executar Tarefa</Link>
              </Button>
            )}
            {selectedEvent?.type === 'action_plan' && (
              <Button asChild>
                <Link to={`/reports`}>Ver Relatórios</Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
