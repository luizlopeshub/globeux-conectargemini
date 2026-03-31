import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from '@/types/calendar'

type ViewProps = {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (e: CalendarEvent) => void
}

export function MonthView({ currentDate, events, onEventClick }: ViewProps) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  })

  return (
    <div className="grid grid-cols-7 border-t border-l mt-4 bg-card rounded-md overflow-hidden shadow-sm animate-fade-in">
      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
        <div
          key={d}
          className="p-2 text-center text-sm font-semibold border-b border-r bg-muted/30"
        >
          {d}
        </div>
      ))}
      {days.map((day, i) => {
        const dayEvents = events
          .filter((e) => isSameDay(e.date, day))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
        const isCurrentMonth = isSameMonth(day, currentDate)
        const isToday = isSameDay(day, new Date())

        return (
          <div
            key={i}
            className={cn(
              'min-h-[120px] p-1.5 border-b border-r transition-colors hover:bg-muted/10',
              !isCurrentMonth && 'bg-muted/20 text-muted-foreground',
            )}
          >
            <div
              className={cn(
                'text-right text-xs p-1 font-medium',
                isToday &&
                  'text-primary-foreground bg-primary rounded-full w-6 h-6 flex items-center justify-center ml-auto',
              )}
            >
              {format(day, 'd')}
            </div>
            <div className="mt-1 flex flex-col gap-1">
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  onClick={() => onEventClick(e)}
                  className={cn(
                    'text-[11px] px-1.5 py-1 rounded-sm cursor-pointer truncate font-medium shadow-sm transition-transform hover:scale-[1.02]',
                    e.type === 'task'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
                  )}
                >
                  {format(e.date, 'HH:mm')} {e.title}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function WeekView({ currentDate, events, onEventClick }: ViewProps) {
  const days = eachDayOfInterval({ start: startOfWeek(currentDate), end: endOfWeek(currentDate) })

  return (
    <div className="grid grid-cols-7 border mt-4 bg-card rounded-md shadow-sm min-h-[500px] animate-fade-in">
      {days.map((day, i) => {
        const dayEvents = events
          .filter((e) => isSameDay(e.date, day))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
        const isToday = isSameDay(day, new Date())

        return (
          <div key={i} className="border-r border-border last:border-r-0 flex flex-col">
            <div
              className={cn(
                'p-2 text-center text-sm border-b font-semibold',
                isToday ? 'bg-primary/5 text-primary' : 'bg-muted/30',
              )}
            >
              {format(day, 'EEE', { locale: ptBR })} <br />
              <span
                className={cn(
                  'text-lg inline-flex items-center justify-center mt-1',
                  isToday && 'bg-primary text-primary-foreground rounded-full w-8 h-8',
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
            <div className="p-1.5 space-y-2 flex-1 bg-muted/5">
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  onClick={() => onEventClick(e)}
                  className={cn(
                    'text-xs p-2.5 rounded-md cursor-pointer shadow-sm border transition-transform hover:-translate-y-0.5',
                    e.type === 'task'
                      ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800',
                  )}
                >
                  <div className="font-bold opacity-80 mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 block" />
                    {format(e.date, 'HH:mm')}
                  </div>
                  <div className="font-medium leading-tight">{e.title}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DayView({ currentDate, events, onEventClick }: ViewProps) {
  const dayEvents = events
    .filter((e) => isSameDay(e.date, currentDate))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="border mt-4 bg-card rounded-md shadow-sm min-h-[400px] animate-fade-in">
      <div className="p-4 text-xl font-bold border-b bg-muted/30 capitalize text-card-foreground">
        {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
      </div>
      <div className="p-4 flex flex-col gap-3">
        {dayEvents.length === 0 && (
          <div className="text-muted-foreground text-center py-12 bg-muted/10 rounded-lg border border-dashed text-sm">
            Nenhum compromisso agendado para este dia.
          </div>
        )}
        {dayEvents.map((e) => (
          <div
            key={e.id}
            onClick={() => onEventClick(e)}
            className={cn(
              'p-4 rounded-lg cursor-pointer flex items-center gap-4 border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5',
              e.type === 'task'
                ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900'
                : 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900',
            )}
          >
            <div
              className={cn(
                'w-1.5 h-14 rounded-full',
                e.type === 'task' ? 'bg-blue-500' : 'bg-amber-500',
              )}
            />
            <div className="flex-1">
              <div className="font-bold text-lg text-foreground mb-0.5">{e.title}</div>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-4 font-medium">
                <span className="flex items-center gap-1">🕒 {format(e.date, 'HH:mm')}</span>
                <span className="capitalize flex items-center gap-1">📌 {e.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
