import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, PenTool, ClipboardList, Database, Users, ChevronDown } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { currentUser, users, setCurrentUser } = useAppStore()
  const location = useLocation()

  const adminMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Construtor', icon: PenTool, path: '/builder' },
    { name: 'Logs e Aprovações', icon: Database, path: '/logs' },
    { name: 'Usuários', icon: Users, path: '/users' },
  ]

  const supervisorMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Logs e Aprovações', icon: Database, path: '/logs' },
  ]

  const operatorMenu = [{ name: 'Meus Checklists', icon: ClipboardList, path: '/' }]

  const menu =
    currentUser?.role === 'admin'
      ? adminMenu
      : currentUser?.role === 'supervisor'
        ? supervisorMenu
        : operatorMenu

  if (!currentUser) return null

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 pl-2 border-primary/20">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline font-medium text-sm truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Simular Usuário</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {users.map((u) => (
                    <DropdownMenuItem
                      key={u.id}
                      onClick={() => setCurrentUser(u)}
                      className={cn(currentUser.id === u.id && 'bg-muted')}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{u.name}</span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {u.role} {u.department ? `· ${u.department}` : ''}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
