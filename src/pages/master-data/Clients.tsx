import { CrudTable } from '@/components/master-data/CrudTable'

export default function Clients() {
  return (
    <CrudTable
      title="Clientes"
      entityType="clients"
      columns={[
        { key: 'name', label: 'Nome do Cliente' },
        { key: 'cnpj', label: 'CNPJ / Documento' },
        { key: 'address', label: 'Endereço Completo' },
      ]}
    />
  )
}
