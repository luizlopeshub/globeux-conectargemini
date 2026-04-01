import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntityDef, EntityFieldDef } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Edit2, Trash2, Save, Database, Loader2 } from 'lucide-react'
import { generateId } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function EntityConfig() {
  const [entityDefs, setEntityDefs] = useState<EntityDef[]>([])
  const [editing, setEditing] = useState<EntityDef | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const loadEntities = async () => {
    try {
      const records = await pb.collection('entity_definitions').getFullList<EntityDef>()
      setEntityDefs(records)
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar as entidades.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    loadEntities()
  }, [])

  const handleEdit = (def?: EntityDef) => {
    if (def)
      setEditing({ ...def, fields: [...def.fields], searchableFields: def.searchableFields || [] })
    else setEditing({ id: '', name: '', slug: '', fields: [], searchableFields: [] })
  }

  const handleSave = async () => {
    if (!editing || !editing.name || !editing.slug || editing.fields.length === 0) {
      toast({
        title: 'Atenção',
        description: 'Preencha o nome, slug e adicione ao menos um campo.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      let existingRecord = null
      try {
        existingRecord = await pb
          .collection('entity_definitions')
          .getFirstListItem(`slug="${editing.slug}"`)
      } catch (err) {
        // Not found, proceeding to create
      }

      const payload = {
        name: editing.name,
        slug: editing.slug,
        fields: editing.fields,
        searchableFields: editing.searchableFields || [],
      }

      if (existingRecord) {
        await pb.collection('entity_definitions').update(existingRecord.id, payload)
        toast({ title: 'Sucesso', description: 'Entidade atualizada com sucesso.' })
      } else {
        await pb.collection('entity_definitions').create(payload)
        toast({ title: 'Sucesso', description: 'Entidade criada com sucesso.' })
      }

      setEditing(null)
      loadEntities()
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: getErrorMessage(err), variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta entidade?')) return
    try {
      await pb.collection('entity_definitions').delete(id)
      toast({ title: 'Sucesso', description: 'Entidade excluída.' })
      loadEntities()
    } catch (err: any) {
      toast({ title: 'Erro', description: getErrorMessage(err), variant: 'destructive' })
    }
  }

  const addField = () => {
    if (!editing) return
    setEditing({
      ...editing,
      fields: [
        ...editing.fields,
        { id: `f_${generateId().substring(0, 6)}`, name: '', type: 'text' as const },
      ],
    })
  }

  const updateField = (idx: number, updates: Partial<EntityFieldDef>) => {
    if (!editing) return
    const newFields = [...editing.fields]
    newFields[idx] = { ...newFields[idx], ...updates }
    setEditing({ ...editing, fields: newFields })
  }

  const removeField = (idx: number) => {
    if (!editing) return
    setEditing({ ...editing, fields: editing.fields.filter((_, i) => i !== idx) })
  }

  if (editing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {editing.id ? `Editar Entidade: ${editing.name}` : 'Nova Entidade'}
          </h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditing(null)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Salvar Entidade
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Configurações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Entidade (Ex: Motoristas)</Label>
                <Input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug da Rota (Ex: motoristas)</Label>
                <Input
                  value={editing.slug}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                    })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Estrutura de Dados (Campos)</CardTitle>
              <CardDescription>Defina as colunas para esta tabela customizada.</CardDescription>
            </div>
            <Button size="sm" onClick={addField} disabled={isLoading}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Campo
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {editing.fields.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Nome do Campo</Label>
                  <Input
                    value={f.name}
                    onChange={(e) => updateField(i, { name: e.target.value })}
                    placeholder="Ex: CPF, Data de Validade..."
                    disabled={isLoading}
                  />
                </div>
                <div className="w-1/3 space-y-1">
                  <Label className="text-xs">Tipo do Dado</Label>
                  <Select
                    value={f.type}
                    onValueChange={(v: any) => updateField(i, { type: v })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texto / Varchar</SelectItem>
                      <SelectItem value="number">Número / Numérico</SelectItem>
                      <SelectItem value="date">Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6 px-3">
                  <input
                    type="checkbox"
                    id={`searchable-${i}`}
                    checked={editing.searchableFields?.includes(f.name) || false}
                    onChange={(e) => {
                      const current = editing.searchableFields || []
                      if (e.target.checked) {
                        setEditing({ ...editing, searchableFields: [...current, f.name] })
                      } else {
                        setEditing({
                          ...editing,
                          searchableFields: current.filter((x) => x !== f.name),
                        })
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isLoading || !f.name}
                  />
                  <Label htmlFor={`searchable-${i}`} className="text-xs cursor-pointer">
                    Buscável
                  </Label>
                </div>
                <div className="pt-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(i)}
                    className="text-destructive"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {editing.fields.length === 0 && (
              <p className="text-center text-muted-foreground py-8 text-sm">
                Nenhum campo definido. Adicione o primeiro campo.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Construtor de Cadastros</h1>
          <p className="text-muted-foreground">
            Crie e gerencie entidades de dados dinâmicas para o sistema.
          </p>
        </div>
        <Button onClick={() => handleEdit()} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Entidade
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Endpoint / Slug</TableHead>
                <TableHead>Qtd. Campos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entityDefs.map((def) => (
                <TableRow key={def.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      {def.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      /{def.slug}
                    </span>
                  </TableCell>
                  <TableCell>{def.fields.length} campos</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => navigate(`/master-data/records/${def.slug}`)}
                    >
                      Gerenciar Dados
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(def)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Estrutura
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:bg-destructive hover:text-white"
                      onClick={() => handleDelete(def.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {entityDefs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Nenhuma entidade configurada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
