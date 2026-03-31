import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/hooks/use-toast'

const Index = lazy(() => import('./pages/Index'))
const Constructor = lazy(() => import('./pages/Constructor'))
const Executor = lazy(() => import('./pages/Executor'))
const AuditLogs = lazy(() => import('./pages/AuditLogs'))
const Users = lazy(() => import('./pages/Users'))
const Reports = lazy(() => import('./pages/Reports'))
const EntityConfig = lazy(() => import('./pages/master-data/EntityConfig'))
const MasterDataRecords = lazy(() => import('./pages/master-data/MasterDataRecords'))
const GeneralSettings = lazy(() => import('./pages/settings/GeneralSettings'))
const Integrations = lazy(() => import('./pages/settings/Integrations'))
const ApiSettings = lazy(() => import('./pages/settings/ApiSettings'))
const Departments = lazy(() => import('./pages/settings/Departments'))
const Subjects = lazy(() => import('./pages/settings/Subjects'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Schedules = lazy(() => import('./pages/Schedules'))

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) => {
  const { isAuthenticated, currentUser } = useAppStore()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRoles) {
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
      return <Unauthorized />
    }
  }

  return <>{children}</>
}

const Unauthorized = () => {
  useEffect(() => {
    toast({
      title: 'Acesso Negado',
      description: 'Você não tem permissão para acessar esta página.',
      variant: 'destructive',
    })
  }, [])
  return <Navigate to="/" replace />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppStore()
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
  </div>
)

const AppContent = () => {
  const { isInitializing, fetchInitialData, isAuthenticated } = useAppStore()

  useEffect(() => {
    fetchInitialData()
  }, [isAuthenticated])

  if (isInitializing) {
    return <PageLoader />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Index />} />
          <Route path="/execute/:id" element={<Executor />} />
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="/reports" element={<Reports />} />

          <Route
            path="/schedules"
            element={
              <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
                <Schedules />
              </ProtectedRoute>
            }
          />

          <Route
            path="/builder"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Constructor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/entities"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <EntityConfig />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/api"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ApiSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/departments"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Departments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/subjects"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Subjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master-data/records/:slug"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MasterDataRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/general"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <GeneralSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/integrations"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Integrations />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </BrowserRouter>
)

export default App
