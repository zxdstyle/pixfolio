import type { CrudSorting } from '@refinedev/core'

export function generateSort(sorters?: CrudSorting) {
    if (sorters && sorters.length > 0) {
        const sorts: Record<string, string> = {}

        sorters.forEach((item) => {
            sorts[`sort.${item.field}`] = item.order
        })

        return sorts
    }
}
