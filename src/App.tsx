import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'

const Index = lazy(() => import('./pages/Index'))
const Constructor = lazy(() => import('./pages/Constructor'))
const Executor = lazy(() => import('./pages/Executor'))
const AuditLogs = lazy(() => import('./pages/AuditLogs'))
const Users = lazy(() => import('./pages/Users'))
const Reports = lazy(() => import('./pages/Reports'))
const Clients = lazy(() => import('./pages/master-data/Clients'))
const Products = lazy(() => import('./pages/master-data/Products'))
const Carriers = lazy(() => import('./pages/master-data/Carriers'))
const NotFound = lazy(() => import('./pages/NotFound'))

const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
  </div>
)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<Constructor />} />
            <Route path="/execute/:id" element={<Executor />} />
            <Route path="/logs" element={<AuditLogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/master-data/clients" element={<Clients />} />
            <Route path="/master-data/products" element={<Products />} />
            <Route path="/master-data/carriers" element={<Carriers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
