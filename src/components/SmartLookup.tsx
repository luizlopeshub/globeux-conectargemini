import * as React from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import useAppStore from '@/stores/useAppStore'
import pb from '@/lib/pocketbase/client'

export interface SmartLookupOption {
  value: string
  label: string
}

export interface SmartLookupProps {
  options?: SmartLookupOption[]
  entitySlug?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SmartLookup({
  options,
  entitySlug,
  value,
  onChange,
  placeholder = 'Selecione...',
}: SmartLookupProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  const [asyncOptions, setAsyncOptions] = React.useState<SmartLookupOption[]>([])
  const { entityDefs, entityRecords, isInitializing } = useAppStore()

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  React.useEffect(() => {
    if (options || !entitySlug) return

    const def = (entityDefs || []).find((d) => d.slug === entitySlug)
    if (!def) return

    const fetchOptions = async () => {
      try {
        let filter = `entity_id = "${def.id}"`
        const sFields = def.searchableFields || []

        if (debouncedSearch && sFields.length > 0) {
          const conditions = sFields
            .map((f) => `data.${f} ~ "${debouncedSearch.replace(/"/g, '')}"`)
            .join(' || ')
          filter += ` && (${conditions})`
        } else if (debouncedSearch && sFields.length === 0) {
          filter += ` && id ~ "${debouncedSearch.replace(/"/g, '')}"`
        }

        const res = await pb.collection('master_data_entries').getList(1, 50, { filter })

        const mapped = res.items.map((r) => {
          let label = ''
          if (sFields.length > 0) {
            const displayFields = sFields.slice(0, 2)
            label = displayFields
              .map((fName) => r.data?.[fName])
              .filter(Boolean)
              .join(' - ')
          }
          if (!label) {
            label =
              r.data?.name ||
              r.data?.nome ||
              r.data?.title ||
              r.data?.descricao ||
              r.data?.razao_social ||
              Object.values(r.data || {})[0] ||
              r.id
          }

          return {
            value: r.id,
            label: String(label),
          }
        })
        setAsyncOptions(mapped)
      } catch (e) {
        console.error('Error fetching lookup options:', e)
      }
    }

    fetchOptions()
  }, [debouncedSearch, entitySlug, entityDefs, options])

  const isOptionsLoading = isInitializing

  const resolvedOptions = options || asyncOptions

  const filteredOptions = options
    ? resolvedOptions.filter((opt) => opt?.label?.toLowerCase().includes(search.toLowerCase()))
    : resolvedOptions

  const getSelectedLabel = () => {
    if (!value) return placeholder
    const opt = resolvedOptions.find((o) => o.value === value)
    if (opt) return opt.label

    if (!options && entitySlug) {
      const r = entityRecords.find((rec) => rec.id === value)
      if (r) {
        const def = (entityDefs || []).find((d) => d.slug === entitySlug)
        const sFields = def?.searchableFields || []
        let label = ''
        if (sFields.length > 0) {
          const displayFields = sFields.slice(0, 2)
          label = displayFields
            .map((fName) => r.data?.[fName])
            .filter(Boolean)
            .join(' - ')
        }
        if (!label) {
          label =
            r.data?.name ||
            r.data?.nome ||
            r.data?.title ||
            r.data?.descricao ||
            r.data?.razao_social ||
            Object.values(r.data || {})[0] ||
            r.id
        }
        return String(label)
      }
    }

    return placeholder
  }

  if (isOptionsLoading) {
    return (
      <Button variant="outline" className="w-full justify-start text-muted-foreground" disabled>
        Carregando...
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className="truncate">{getSelectedLabel()}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: 'var(--radix-popover-trigger-width)' }}
        className="p-0"
        align="start"
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">Nenhum resultado.</div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                    value === option.value && 'bg-accent text-accent-foreground',
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
