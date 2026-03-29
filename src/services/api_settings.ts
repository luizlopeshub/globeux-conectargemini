import pb from '@/lib/pocketbase/client'

export interface ApiSettings {
  id?: string
  webhook_url?: string
  smtp_host?: string
  smtp_port?: string
  smtp_user?: string
  smtp_pass?: string
  smtp_encryption?: string
}

export const getApiSettings = async (): Promise<ApiSettings | null> => {
  try {
    const records = await pb.collection('api_settings').getFullList<ApiSettings>()
    return records[0] || null
  } catch (error) {
    console.error('Error fetching api settings:', error)
    return null
  }
}

export const saveApiSettings = async (data: ApiSettings): Promise<ApiSettings> => {
  const records = await pb.collection('api_settings').getFullList()
  if (records.length > 0) {
    return pb.collection('api_settings').update<ApiSettings>(records[0].id, data)
  } else {
    return pb.collection('api_settings').create<ApiSettings>(data)
  }
}
