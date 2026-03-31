import { useState, useEffect } from 'react'
import {
  getApiSettings,
  saveApiSettings,
  ApiSettings as ApiSettingsType,
} from '@/services/api_settings'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Save } from 'lucide-react'

export default function ApiSettings() {
  const [settings, setSettings] = useState<ApiSettingsType>({})
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    getApiSettings()
      .then((data) => {
        if (data) setSettings(data)
      })
      .finally(() => setInitialLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const id = settings.id || null
      const saved = await saveApiSettings(id, settings)
      setSettings(saved)
      toast({ title: 'Sucesso', description: 'Configurações da API salvas com sucesso.' })
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao salvar',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Configurações de API</h1>
        <p className="text-muted-foreground">Gerencie webhooks e configurações SMTP.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook</CardTitle>
          <CardDescription>URL para envio de eventos do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="webhook_url">Webhook URL</Label>
            <Input
              id="webhook_url"
              name="webhook_url"
              value={settings.webhook_url || ''}
              onChange={handleChange}
              placeholder="https://api.exemplo.com/webhook"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações SMTP</CardTitle>
          <CardDescription>Credenciais para envio de e-mails do sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp_host">Host</Label>
              <Input
                id="smtp_host"
                name="smtp_host"
                value={settings.smtp_host || ''}
                onChange={handleChange}
                placeholder="smtp.exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp_port">Porta</Label>
              <Input
                id="smtp_port"
                name="smtp_port"
                value={settings.smtp_port || ''}
                onChange={handleChange}
                placeholder="587"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp_user">Usuário</Label>
              <Input
                id="smtp_user"
                name="smtp_user"
                value={settings.smtp_user || ''}
                onChange={handleChange}
                placeholder="usuario@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp_pass">Senha</Label>
              <Input
                id="smtp_pass"
                name="smtp_pass"
                type="password"
                value={settings.smtp_pass || ''}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp_encryption">Criptografia</Label>
            <Input
              id="smtp_encryption"
              name="smtp_encryption"
              value={settings.smtp_encryption || ''}
              onChange={handleChange}
              placeholder="TLS / SSL"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
