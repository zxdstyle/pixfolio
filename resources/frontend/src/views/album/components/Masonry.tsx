import RouterAnimation from '@/components/RouterAnimation'
import SmoothScroll from '@/components/SmoothScroll'
import { CursorContext } from '@/layouts/context/cursor'
import { createMasonry } from '@solid-primitives/masonry'
import { useContext } from 'solid-js'

interface Props {
    images?: Service.Photo[]
    album?: Service.Album
}

export default function Masonry(props: Props) {
    const { setActive, setInactive } = useContext(CursorContext)

    const masonry = createMasonry({
        source: () => props.images,
        columns: () => {
            return 3
        },
        mapHeight(item) {
            return () => item.height
        },
        mapElement(item) {
            return (
                <div
                    class="cursor-pointer overflow-hidden group rounded"
                    style={{
                        // width: `${item.source.width}px`,
                        // height: `${item.margin() + item.source.height}px`,
                        order: item.order(),
                    }}
                    onMouseOver={setActive}
                    onMouseLeave={setInactive}
                >
                    <img class="group-hover:scale-105 transition-all duration-500" src={item.source.thumbnail_url} alt="" />
                </div>
            )
        },
    })

    return (
        <SmoothScroll>
            <section class="px-44 py-32 w-full h-full">
                <RouterAnimation
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100, transition: { duration: 1 } }}
                    transition={{ duration: 2 }}
                    class="mx-32 h-full text-gray-300 text-center"
                >
                    <h1 class="text-4xl">{props.album?.name}</h1>

                    <h2 class="text-lg text-white/40 my-4 uppercase">{props.album?.subtitle}</h2>

                    <p class="mx-auto max-w-4xl text-center mb-2">{props.album?.description}</p>

                    <div class="box-border flex min-h-screen w-full flex-col items-center justify-center space-y-4 py-12 text-white overflow-scroll mx-auto">
                        <div
                            class="flex flex-col flex-wrap justify-start gap-10 "
                            style={{ height: `${masonry.height() - 24}px` }}
                        >
                            {masonry()}
                        </div>
                    </div>
                </RouterAnimation>
            </section>
        </SmoothScroll>
    )
}
