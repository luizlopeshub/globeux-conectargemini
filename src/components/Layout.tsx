import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, PenTool, ClipboardList, Database, UserCircle } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { role, setRole } = useAppStore()
  const location = useLocation()

  const adminMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Construtor', icon: PenTool, path: '/builder' },
    { name: 'Logs de Auditoria', icon: Database, path: '/logs' },
  ]

  const operatorMenu = [{ name: 'Meus Checklists', icon: ClipboardList, path: '/' }]

  const menu = role === 'admin' ? adminMenu : operatorMenu

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" className="border-r border-border">
          <SidebarHeader className="p-4 flex items-center justify-between border-b">
            <span className="font-bold text-lg text-primary truncate">LogiAudit Pro</span>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    className={cn(
                      'transition-colors',
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                        : '',
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="font-medium text-sm md:text-base truncate">
                {menu.find((m) => m.path === location.pathname)?.name || 'Aplicação'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="hidden sm:inline">Sincronizado</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRole(role === 'admin' ? 'operator' : 'admin')}
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Simular {role === 'admin' ? 'Operador' : 'Admin'}
                </span>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
