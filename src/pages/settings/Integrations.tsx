import { useEffect, useState } from 'react'
import { getApiSettings, saveApiSettings, ApiSettings } from '@/services/api_settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function Integrations() {
  const [settings, setSettings] = useState<ApiSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getApiSettings().then((data) => {
      if (data) setSettings(data)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const saved = await saveApiSettings(settings)
      setSettings(saved)
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar configurações.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof ApiSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
          <p className="text-muted-foreground">
            Configure webhooks e integrações externas do sistema.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Configurações
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks de Saída</CardTitle>
          <CardDescription>
            URL para envio automático de dados após aprovação de checklists.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>URL do Webhook</Label>
            <Input
              placeholder="https://api.exemplo.com/webhook"
              value={settings.webhook_url || ''}
              onChange={(e) => handleChange('webhook_url', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações SMTP</CardTitle>
          <CardDescription>Servidor de e-mail para envio de notificações.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Host SMTP</Label>
              <Input
                placeholder="smtp.exemplo.com"
                value={settings.smtp_host || ''}
                onChange={(e) => handleChange('smtp_host', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Porta</Label>
              <Input
                placeholder="587"
                value={settings.smtp_port || ''}
                onChange={(e) => handleChange('smtp_port', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Usuário</Label>
              <Input
                placeholder="usuario@exemplo.com"
                value={settings.smtp_user || ''}
                onChange={(e) => handleChange('smtp_user', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                value={settings.smtp_pass || ''}
                onChange={(e) => handleChange('smtp_pass', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Criptografia</Label>
              <Input
                placeholder="TLS / SSL"
                value={settings.smtp_encryption || ''}
                onChange={(e) => handleChange('smtp_encryption', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
