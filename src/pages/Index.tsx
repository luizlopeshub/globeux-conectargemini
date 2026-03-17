import useAppStore from '@/stores/useAppStore'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
import { OperatorDashboard } from '@/components/dashboard/OperatorDashboard'

export default function Index() {
  const { role } = useAppStore()

  return role === 'admin' ? <AdminDashboard /> : <OperatorDashboard />
}
