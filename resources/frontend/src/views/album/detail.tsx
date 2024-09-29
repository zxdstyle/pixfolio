import NavLine from '@/components/NavLine'
import Masonry from '@/views/album/components/Masonry'
import { useNavigate, useParams } from '@solidjs/router'
import { useList, useOne } from '@solidjs-components/refine'
import { Show } from 'solid-js'

export default function Detail() {
    const params = useParams()
    const navigate = useNavigate()
    const query = useList<Service.Photo>({
        resource: `albums/${params.id}/photos`,
    })

    const album = useOne<Service.Album>({
        resource: 'albums',
        id: params.id,
    })

    return (
        <div class="w-full h-full flex bg-black/90 z-top">
            <NavLine title={album.data?.data.name} subTitle={album.data?.data.subtitle} class="left-36" position="center" />

            <Show when={query.data?.data}>
                <Masonry images={query.data?.data} album={album.data?.data} />
            </Show>

            {/* <Carousel /> */}

            <NavLine title="返回" subTitle="return" class="right-36" position="bottom" onClick={() => navigate(-1)} />
        </div>
    )
}
