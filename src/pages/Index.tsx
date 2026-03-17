import { Suspense, lazy } from 'react'
import useAppStore from '@/stores/useAppStore'

const AdminDashboard = lazy(() =>
  import('@/components/dashboard/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)
const OperatorDashboard = lazy(() =>
  import('@/components/dashboard/OperatorDashboard').then((m) => ({
    default: m.OperatorDashboard,
  })),
)

export default function Index() {
  const { role } = useAppStore()

  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
        </div>
      }
    >
      {role === 'admin' ? <AdminDashboard /> : <OperatorDashboard />}
    </Suspense>
  )
}
