import NavLine from '@/components/NavLine'
import RouterAnimation from '@/components/RouterAnimation'
import { CursorContext } from '@/layouts/context/cursor'
import { A, useNavigate } from '@solidjs/router'
import { useList } from '@solidjs-components/refine'
import { For, Show, useContext } from 'solid-js'

export default function Album() {
    const navigate = useNavigate()
    const { setActive, setInactive } = useContext(CursorContext)
    const query = useList<Service.Album>({
        resource: 'albums',
        meta: {
            preload: ['Cover'],
        },
        filters: () => [{ field: 'id', operator: 'gt', value: 1 }],
        sorters: [{ field: 'id', order: 'desc' }],
    })
    const images = () => query.data?.data || []

    return (
        <div class="w-full h-full flex bg-black/90 z-top">
            <NavLine title="作品集" subTitle="Albums" class="left-36" position="center" />

            <section class="px-44 py-32 w-full h-full overflow-auto">
                <RouterAnimation
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100, transition: { duration: 1 } }}
                    transition={{ duration: 2 }}
                    class="mx-32"
                >
                    <ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-12">
                        <For each={images()}>
                            {item => (
                                <li
                                    class="group"
                                    onMouseOver={() => setActive && setActive()}
                                    onMouseLeave={() => setInactive && setInactive()}
                                >
                                    <A href={`/album/${item.id}`}>
                                        <div class="rounded overflow-hidden h-32 bg-black">
                                            <Show when={item.cover?.thumbnail_url}>
                                                <div
                                                    style={{ 'background-image': `url(${item.cover?.thumbnail_url})` }}
                                                    class="group-hover:scale-105 transition-all duration-500 w-full h-full bg-cover bg-center"
                                                />
                                            </Show>
                                        </div>

                                        <small class="font-bold text-white/50 uppercase line-clamp-1 text-ellipsis leading-5 mt-1">{item.subtitle}</small>
                                        <h5 class="text-2xl text-white font-bold uppercase">{item.name}</h5>
                                    </A>
                                </li>
                            )}
                        </For>
                    </ul>
                    <Show when={images().length === 0}>
                        <p class="text-center text-white/40">暂无作品集...</p>
                    </Show>
                </RouterAnimation>
            </section>

            <NavLine title="返回" subTitle="return" class="right-36" position="bottom" onClick={() => navigate('/')} />
        </div>
    )
}
