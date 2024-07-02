interface IStorage {
    id: number
    name: string
    driver: string
    addition: Record<string, any>
    created_at: string
    updated_at: string
}

interface IAlbum {
    id: number
    title: string
    sub_title: string
    cover: string
    description: string
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

interface FileDescription {
    id: number
    is_folder: boolean
    path: string
    name: string
    mode: string
    size: number
    created_at: string
    accessed_at: string
    updated_at: string
    thumbnail: string

    exif?: ExifItem[]
}

interface ExifItem {
    key: string
    label: string
    value: string
    enums: Enums
}

type Enums = Record<string, string>

interface IImage {
    id: number
    path: string
    ext: string
    size: number
    created_at: string
    updated_at: string
}
