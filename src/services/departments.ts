import pb from '@/lib/pocketbase/client'
import type { Department } from '@/types'

export const getDepartments = () =>
  pb.collection('departments').getFullList<Department>({ sort: 'name' })
export const createDepartment = (data: { name: string }) =>
  pb.collection('departments').create<Department>(data)
export const updateDepartment = (id: string, data: { name: string }) =>
  pb.collection('departments').update<Department>(id, data)
export const deleteDepartment = (id: string) => pb.collection('departments').delete(id)
