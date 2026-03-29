import pb from '@/lib/pocketbase/client'
import { Subject } from '@/types'

export const getSubjects = async (): Promise<Subject[]> => {
  return pb.collection('subjects').getFullList({
    sort: 'name',
  })
}
