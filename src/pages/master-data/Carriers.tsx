import { CrudTable } from '@/components/master-data/CrudTable'

export default function Carriers() {
  return (
    <CrudTable
      title="Transportadoras"
      entityType="carriers"
      columns={[
        { key: 'name', label: 'Razão Social' },
        { key: 'fleetType', label: 'Tipo de Frota' },
        { key: 'contact', label: 'Contato' },
      ]}
    />
  )
}
