import type { CrudOperators } from '@refinedev/core'

export function mapOperator(operator: CrudOperators): string {
    switch (operator) {
        case 'ne':
        case 'gte':
        case 'lte':
            return `_${operator}`
        case 'contains':
            return '_like'
        default:
            return ''
    }
}
