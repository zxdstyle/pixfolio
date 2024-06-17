interface IStorage {
    id: number
    name: string
    driver: string
    addition: Record<string, any>
    created_at: string
    updated_at: string
}

interface IDriver {
    name: string
    slug: string
    additions: AdditionItem[]
}

interface AdditionItem {
    name: string
    type: 'string' | 'number' | 'bool' | 'select'
    default: string
    options: string
    required: boolean
    help: string
}
