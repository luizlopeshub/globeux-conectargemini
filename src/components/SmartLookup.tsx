import { useState, useEffect } from 'react'
import useAppStore from '@/stores/useAppStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value?: string
  onChange: (val: string) => void
  defaultEntityType?: string
  allowEntityChange?: boolean
  error?: boolean
}

export function SmartLookup({
  value,
  onChange,
  defaultEntityType = '',
  allowEntityChange = true,
  error,
}: Props) {
  const { entityDefs, entityRecords } = useAppStore()
  const [entityType, setEntityType] = useState(defaultEntityType)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (defaultEntityType && !allowEntityChange) {
      setEntityType(defaultEntityType)
    }
  }, [defaultEntityType, allowEntityChange])

  useEffect(() => {
    if (search.length >= 3 && entityType) {
      setLoading(true)
      const timer = setTimeout(() => {
        const filtered = entityRecords
          .filter(
            (r) =>
              r.entityId === entityType &&
              Object.values(r).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase()),
              ),
          )
          .slice(0, 50)
        setResults(filtered)
        setLoading(false)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      setResults([])
      setLoading(false)
    }
  }, [search, entityType, entityRecords])

  const def = entityDefs.find((d) => d.id === entityType)

  const getName = (item: any) => {
    const firstField = def?.fields[0]?.id || 'id'
    return item[firstField]
  }

  const getMeta = (item: any) => {
    if (entityType === 'clients') return item.cnpj || ''
    if (entityType === 'products') return item.lote || item.sku || ''
    const secondField = def?.fields[1]?.id
    return secondField ? item[secondField] : ''
  }

  const selectedItem = value ? entityRecords.find((r) => r.id === value) : null

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        value={entityType}
        onValueChange={(val) => {
          setEntityType(val)
          onChange('')
          setSearch('')
          setResults([])
        }}
        disabled={!allowEntityChange}
      >
        <SelectTrigger className={cn('bg-white', error && 'border-destructive')}>
          <SelectValue placeholder="Tipo de Entidade" />
        </SelectTrigger>
        <SelectContent>
          {entityDefs.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={!entityType}
            className={cn(
              'w-full justify-start h-10 bg-white font-normal',
              error && 'border-destructive',
            )}
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate flex-1 text-left">
              {selectedItem ? getName(selectedItem) : `Pesquisar ${def?.name || 'Registro'}...`}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={`Digite 3+ caracteres para buscar...`}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {search.length < 3 && (
                <div className="py-4 text-center text-xs text-muted-foreground">
                  Digite pelo menos 3 caracteres...
                </div>
              )}
              {search.length >= 3 && loading && (
                <div className="py-4 flex items-center justify-center text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Buscando no servidor...
                </div>
              )}
              {search.length >= 3 && !loading && results.length === 0 && (
                <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
              )}
              {search.length >= 3 && !loading && results.length > 0 && (
                <CommandGroup>
                  {results.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => {
                        onChange(item.id)
                        setOpen(false)
                        setSearch('')
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          value === item.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium truncate">{getName(item)}</span>
                        {getMeta(item) && (
                          <span className="text-xs text-muted-foreground truncate">
                            {getMeta(item)}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
