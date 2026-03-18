import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'
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
import { Plus, Edit2, Trash2, Save, Database } from 'lucide-react'
import { generateId } from '@/lib/utils'

export default function EntityConfig() {
  const { entityDefs, saveEntityDef, deleteEntityDef } = useAppStore()
  const [editing, setEditing] = useState<EntityDef | null>(null)

  const handleEdit = (def?: EntityDef) => {
    if (def) setEditing({ ...def, fields: [...def.fields] })
    else setEditing({ id: `ent_${generateId().substring(0, 6)}`, name: '', slug: '', fields: [] })
  }

  const handleSave = () => {
    if (!editing || !editing.name || !editing.slug || editing.fields.length === 0) return
    saveEntityDef(editing)
    setEditing(null)
  }

  const addField = () => {
    if (!editing) return
    setEditing({
      ...editing,
      fields: [
        ...editing.fields,
        { id: `f_${generateId().substring(0, 6)}`, name: '', type: 'text' },
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
            {editing.name ? `Editar Entidade: ${editing.name}` : 'Nova Entidade'}
          </h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" /> Salvar Entidade
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
            <Button size="sm" onClick={addField}>
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
                  />
                </div>
                <div className="w-1/3 space-y-1">
                  <Label className="text-xs">Tipo do Dado</Label>
                  <Select value={f.type} onValueChange={(v: any) => updateField(i, { type: v })}>
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
                <div className="pt-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(i)}
                    className="text-destructive"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entityDefs.map((def) => (
          <Card key={def.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-primary" /> {def.name}
              </CardTitle>
              <CardDescription>/{def.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {def.fields.length} campos configurados.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(def)}
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Editar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => deleteEntityDef(def.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
