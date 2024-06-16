interface IDriver {
    name: string
    slug: string
    additions: AdditionItem[]
}

interface AdditionItem {
    name: string
    type: 'string'
    default: string
    options: string
    required: boolean
    help: string
}
