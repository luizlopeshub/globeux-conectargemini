import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PenTool,
  ClipboardList,
  Database,
  Users as UsersIcon,
  ChevronDown,
  Briefcase,
  ChevronRight,
  LineChart,
  Settings,
  Search,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { currentUser, users, setCurrentUser, entityDefs } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()

  if (!currentUser) return null

  const renderMenuItem = (name: string, icon: any, path: string) => (
    <SidebarMenuItem key={name}>
      <SidebarMenuButton
        asChild
        isActive={location.pathname === path}
        className={cn(
          'transition-colors',
          location.pathname === path
            ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
            : '',
        )}
      >
        <Link to={path}>
          {icon && <icon.type className="h-4 w-4 mr-2" />}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" className="border-r border-border">
          <SidebarHeader className="p-4 flex items-center justify-between border-b">
            <span className="font-bold text-lg text-primary truncate">LogiAudit Pro</span>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {currentUser.role === 'admin' ? (
                <>
                  {renderMenuItem('Dashboard', <LayoutDashboard />, '/')}
                  {renderMenuItem('Construtor', <PenTool />, '/builder')}
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Settings className="h-4 w-4 mr-2" />
                          <span>Configurações</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === '/settings/general'}
                            >
                              <Link to="/settings/general">Geral</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Briefcase className="h-4 w-4 mr-2" />
                          <span>Cadastros</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === '/master-data/config'}
                            >
                              <Link
                                to="/master-data/config"
                                className="text-primary font-medium flex items-center gap-2"
                              >
                                <Settings className="h-3.5 w-3.5" /> Configurar Entidades
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          {entityDefs.map((def) => (
                            <SidebarMenuSubItem key={def.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === `/master-data/${def.slug}`}
                              >
                                <Link to={`/master-data/${def.slug}`}>{def.name}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  {renderMenuItem('Relatórios e Consultas', <LineChart />, '/reports')}
                  {renderMenuItem('Logs e Aprovações', <Database />, '/logs')}
                  {renderMenuItem('Usuários', <UsersIcon />, '/users')}
                </>
              ) : currentUser.role === 'supervisor' ? (
                <>
                  {renderMenuItem('Dashboard', <LayoutDashboard />, '/')}
                  {renderMenuItem('Relatórios e Consultas', <LineChart />, '/reports')}
                  {renderMenuItem('Logs e Aprovações', <Database />, '/logs')}
                </>
              ) : (
                <>{renderMenuItem('Meus Checklists', <ClipboardList />, '/')}</>
              )}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0">
            <div className="flex items-center gap-2 flex-1 min-w-0 mr-4">
              <SidebarTrigger />
              <h1 className="hidden md:block font-medium text-sm md:text-base truncate mr-2">
                Aplicação
              </h1>
              <div className="relative w-full max-w-sm ml-auto sm:ml-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar Documento ou NF..."
                  className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background h-9 text-sm w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/reports?searchDoc=${encodeURIComponent(e.currentTarget.value)}`)
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 pl-2 border-primary/20 shrink-0">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline font-medium text-sm truncate max-w-[120px]">
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
