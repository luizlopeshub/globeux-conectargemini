import pb from '@/lib/pocketbase/client'
import type { Subject } from '@/types'

export const getSubjects = () => pb.collection('subjects').getFullList<Subject>({ sort: 'name' })
export const createSubject = (data: { name: string }) =>
  pb.collection('subjects').create<Subject>(data)
export const updateSubject = (id: string, data: { name: string }) =>
  pb.collection('subjects').update<Subject>(id, data)
export const deleteSubject = (id: string) => pb.collection('subjects').delete(id)
