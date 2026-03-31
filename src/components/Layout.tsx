import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Home,
  Calendar,
  ClipboardList,
  BarChart,
  Wrench,
  Users,
  Settings,
  LogOut,
  FolderTree,
} from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar'
import useAppStore from '@/stores/useAppStore'

export default function Layout() {
  const { currentUser, logout } = useAppStore()
  const location = useLocation()
  const role = currentUser?.role || 'operator'

  const navItems = [
    { title: 'Início', path: '/', icon: Home, roles: ['admin', 'supervisor', 'operator'] },
    { title: 'Agendamentos', path: '/schedules', icon: Calendar, roles: ['admin', 'supervisor'] },
    {
      title: 'Auditorias',
      path: '/logs',
      icon: ClipboardList,
      roles: ['admin', 'supervisor', 'operator'],
    },
    {
      title: 'Relatórios',
      path: '/reports',
      icon: BarChart,
      roles: ['admin', 'supervisor', 'operator'],
    },
    { title: 'Construtor', path: '/builder', icon: Wrench, roles: ['admin'] },
    { title: 'Usuários', path: '/users', icon: Users, roles: ['admin'] },
    { title: 'Entidades', path: '/master-data/config', icon: FolderTree, roles: ['admin'] },
    { title: 'Configurações', path: '/settings/general', icon: Settings, roles: ['admin'] },
  ]

  const filteredNav = navItems.filter((item) => item.roles.includes(role))

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 flex flex-row items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <span className="text-lg font-bold text-primary-foreground">G</span>
          </div>
          <span className="text-lg font-bold truncate">GLOBEUX</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredNav.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                      <Link to={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium">
                  {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name || 'Usuário'}</p>
              <p className="text-xs text-muted-foreground capitalize truncate">{role}</p>
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut />
                <span>Sair da conta</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-slate-50">
        <header className="h-14 flex items-center px-4 border-b bg-background md:hidden">
          <SidebarTrigger />
          <span className="ml-4 font-bold">GLOBEUX</span>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
