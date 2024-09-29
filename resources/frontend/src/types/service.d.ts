declare namespace Service {
    interface Photo {
        id: number
        original_name: string
        filename: string
        url: string
        size: number
        ext: string
        width: number
        height: number
        thumbnail: string
        thumbnail_url: string
        created_at: string
        updated_at: string
    }

    interface Album {
        id: number
        name: string
        subtitle: string
        description: string
        created_at: string
        updated_at: string
        cover_id: number
        cover?: Photo
    }

    interface AlbumHasPhoto {
        id: number
        album_id: number
        photo_id: number
        created_at: string
        updated_at: string
    }

    interface User {
        id: number
        username: string
        created_at: string
        updated_at: string

        album_count: number
        photo_count: number
    }
}
