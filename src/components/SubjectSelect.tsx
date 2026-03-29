import { useState, useMemo } from 'react'
import { Subject } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubjectSelectProps {
  value: string
  onChange: (val: string) => void
  subjects: Subject[]
}

export function SubjectSelect({ value, onChange, subjects }: SubjectSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return subjects.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
  }, [subjects, search])

  // Supports finding by ID or fallback to name (useful for migrating legacy mock data)
  const selectedSubject = subjects.find((s) => s.id === value || s.name === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-10 px-3 font-normal"
        >
          {selectedSubject ? (
            selectedSubject.name
          ) : (
            <span className="text-muted-foreground">Selecione um assunto...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Buscar assunto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-0 focus-visible:ring-0 px-0 shadow-none"
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Nenhum assunto encontrado.
            </div>
          ) : (
            filtered.map((subject) => {
              const isSelected = selectedSubject?.id === subject.id
              return (
                <div
                  key={subject.id}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    isSelected ? 'bg-accent text-accent-foreground' : '',
                  )}
                  onClick={() => {
                    onChange(subject.id)
                    setOpen(false)
                    setSearch('')
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                  {subject.name}
                </div>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
