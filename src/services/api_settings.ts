import pb from '@/lib/pocketbase/client'

export interface ApiSettings {
  id?: string
  webhook_url?: string
  smtp_host?: string
  smtp_port?: string
  smtp_user?: string
  smtp_pass?: string
  smtp_encryption?: string
  created?: string
  updated?: string
}

export async function getApiSettings(): Promise<ApiSettings | null> {
  try {
    const records = await pb.collection('api_settings').getFullList<ApiSettings>()
    return records[0] || null
  } catch (e) {
    return null
  }
}

export async function saveApiSettings(id: string | null, data: Partial<ApiSettings>) {
  if (id) {
    return await pb.collection('api_settings').update<ApiSettings>(id, data)
  } else {
    return await pb.collection('api_settings').create<ApiSettings>(data)
  }
}
