import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import pb from '@/lib/pocketbase/client'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'
import { Package } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const { login, isLoading } = useAppStore()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      
      if (pb.authStore.isValid && pb.authStore.record?.active === false) {
        pb.authStore.clear()
        toast({
          title: 'Acesso Negado',
          description: 'Este utilizador está inativo. Entre em contato com o administrador.',
          variant: 'destructive',
        })
        window.location.reload()
        return
      }

      navigate('/')
    } catch (err) {
      // Error is handled by store with toast
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: 'Atenção',
        description: 'Informe seu e-mail no campo acima para recuperar a senha.',
        variant: 'destructive',
      })
      return
    }
    setIsResetting(true)
    try {
      await pb.collection('users').requestPasswordReset(email)
      toast({
        title: 'E-mail de recuperação enviado!',
        description: 'Verifique sua caixa de entrada com as instruções para redefinir sua senha.',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description:
          'Não foi possível solicitar a recuperação de senha. Verifique o e-mail informado.',
        variant: 'destructive',
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-4 animate-fade-in-up">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">LogiAudit</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de Auditorias e Checklists Logísticos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acesso ao Sistema</CardTitle>
            <CardDescription>Insira suas credenciais para acessar a plataforma.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="luiz@globexmultimodal.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button
                    variant="link"
                    className="px-0 h-auto text-xs font-normal"
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isResetting}
                  >
                    Esqueci minha senha?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-xs text-muted-foreground"
                  onClick={() => {
                    pb.authStore.clear()
                    window.location.reload()
                  }}
                >
                  Problemas no acesso? Limpar Sessão
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
