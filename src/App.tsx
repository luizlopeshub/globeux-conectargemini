import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import useAppStore from '@/stores/useAppStore'

const Index = lazy(() => import('./pages/Index'))
const Constructor = lazy(() => import('./pages/Constructor'))
const Executor = lazy(() => import('./pages/Executor'))
const AuditLogs = lazy(() => import('./pages/AuditLogs'))
const Users = lazy(() => import('./pages/Users'))
const Reports = lazy(() => import('./pages/Reports'))
const EntityConfig = lazy(() => import('./pages/master-data/EntityConfig'))
const DynamicEntityCrud = lazy(() => import('./pages/master-data/DynamicEntityCrud'))
const GeneralSettings = lazy(() => import('./pages/settings/GeneralSettings'))
const Integrations = lazy(() => import('./pages/settings/Integrations'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppStore()
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
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

const AppHydrator = () => {
  const { fetchInitialData, isAuthenticated } = useAppStore()
  useEffect(() => {
    if (isAuthenticated) {
      fetchInitialData()
    }
  }, [isAuthenticated])
  return null
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppHydrator />
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
            <Route path="/builder" element={<Constructor />} />
            <Route path="/execute/:id" element={<Executor />} />
            <Route path="/logs" element={<AuditLogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/master-data/config" element={<EntityConfig />} />
            <Route path="/master-data/:slug" element={<DynamicEntityCrud />} />
            <Route path="/settings/general" element={<GeneralSettings />} />
            <Route path="/settings/integrations" element={<Integrations />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
