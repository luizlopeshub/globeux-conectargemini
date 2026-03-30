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
import pb from '@/lib/pocketbase/client'

interface Props {
  value?: string
  onChange: (val: string) => void
  defaultEntityType?: string
  allowEntityChange?: boolean
  error?: boolean
  dataSourceType?: 'internal' | 'external_api' | 'master_data'
  apiUrl?: string
  apiMapping?: string
}

export function SmartLookup({
  value,
  onChange,
  defaultEntityType = '',
  allowEntityChange = true,
  error,
  dataSourceType = 'internal',
  apiUrl,
  apiMapping,
}: Props) {
  const { entityDefs, entityRecords } = useAppStore()
  const [entityType, setEntityType] = useState(defaultEntityType)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [externalValueName, setExternalValueName] = useState<string>('')

  useEffect(() => {
    if (defaultEntityType && !allowEntityChange) {
      setEntityType(defaultEntityType)
    }
  }, [defaultEntityType, allowEntityChange])

  const def = entityDefs.find((d) => d.id === entityType || d.slug === entityType)
  const resolvedEntityId = def?.id

  useEffect(() => {
    if (search.length >= 3) {
      if (dataSourceType === 'internal' && entityType) {
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
      } else if (dataSourceType === 'master_data' && resolvedEntityId) {
        setLoading(true)
        const timer = setTimeout(async () => {
          try {
            const records = await pb.collection('master_data_entries').getList(1, 50, {
              filter: `entity_id = "${resolvedEntityId}" && data ~ "${search}"`,
            })
            setResults(
              records.items.map((item) => ({
                id: item.id,
                ...item.data,
              })),
            )
          } catch (e) {
            console.error('Master data lookup failed', e)
            setResults([])
          } finally {
            setLoading(false)
          }
        }, 600)
        return () => clearTimeout(timer)
      } else if (dataSourceType === 'external_api' && apiUrl) {
        setLoading(true)
        const timer = setTimeout(async () => {
          try {
            const url = apiUrl.replace('{query}', encodeURIComponent(search))
            const response = await fetch(url)
            const data = await response.json()

            let items = data
            if (apiMapping) {
              const parts = apiMapping.split('.')
              for (const part of parts) {
                if (items && items[part]) {
                  items = items[part]
                }
              }
            }

            if (Array.isArray(items)) {
              setResults(
                items.map((it: any, idx) => ({
                  id: it.id || it.code || String(idx),
                  name: it.name || it.title || it.description || Object.values(it)[0] || 'Item',
                })),
              )
            } else {
              setResults([])
            }
          } catch (e) {
            console.error('External API lookup failed', e)
            setResults([])
          } finally {
            setLoading(false)
          }
        }, 600)
        return () => clearTimeout(timer)
      }
    } else {
      setResults([])
      setLoading(false)
    }
  }, [search, entityType, entityRecords, dataSourceType, apiUrl, apiMapping, resolvedEntityId])

  const getName = (item: any) => {
    if (dataSourceType === 'external_api') return item.name
    if (dataSourceType === 'master_data') {
      const firstField = def?.fields?.[0]?.id || def?.fields?.[0]?.name || 'id'
      return (
        item[firstField] ||
        item.name ||
        item.title ||
        item.description ||
        Object.values(item).find((v) => typeof v === 'string' && v !== item.id) ||
        'Item'
      )
    }
    const firstField = def?.fields?.[0]?.id || 'id'
    return item[firstField]
  }

  const getMeta = (item: any) => {
    if (dataSourceType === 'external_api') return item.id
    if (dataSourceType === 'master_data') {
      const secondField = def?.fields?.[1]?.id || def?.fields?.[1]?.name
      return secondField ? item[secondField] : ''
    }
    if (entityType === 'clients') return item.cnpj || ''
    if (entityType === 'products') return item.lote || item.sku || ''
    const secondField = def?.fields?.[1]?.id
    return secondField ? item[secondField] : ''
  }

  const selectedItem =
    value && dataSourceType === 'internal' ? entityRecords.find((r) => r.id === value) : null

  const displayValue =
    (dataSourceType === 'external_api' || dataSourceType === 'master_data') && value
      ? externalValueName || value
      : selectedItem
        ? getName(selectedItem)
        : `Pesquisar ${dataSourceType === 'external_api' ? 'API Externa' : def?.name || 'Registro'}...`

  return (
    <div className="flex flex-col gap-2 w-full">
      {dataSourceType === 'internal' && (
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
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={dataSourceType === 'internal' && !entityType}
            className={cn(
              'w-full justify-start h-10 bg-white font-normal',
              error && 'border-destructive',
            )}
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate flex-1 text-left">{displayValue}</span>
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
                        if (dataSourceType === 'external_api' || dataSourceType === 'master_data') {
                          setExternalValueName(getName(item))
                        }
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
