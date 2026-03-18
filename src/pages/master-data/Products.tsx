import { CrudTable } from '@/components/master-data/CrudTable'

export default function Products() {
  return (
    <CrudTable
      title="Produtos"
      entityType="products"
      columns={[
        { key: 'name', label: 'Nome do Produto' },
        { key: 'sku', label: 'SKU / Código' },
        { key: 'category', label: 'Categoria' },
      ]}
    />
  )
}
