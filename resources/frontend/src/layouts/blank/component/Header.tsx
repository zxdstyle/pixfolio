import { CursorContext } from '@/layouts/context/cursor'
import { A } from '@solidjs/router'
import { useContext } from 'solid-js'
import { Motion } from 'solid-motionone'

export default function Header() {
    const { setActive, setInactive } = useContext(CursorContext)

    // const authed = createMemo(() => {
    //     return !!localStorage.getItem('authorization')
    // })

    return (
        <header class="fixed left-0 right-0 top-0 w-full z-top">
            <div class="flex justify-between p-12">
                <div class="logo" />
                <nav class=" text-xs">
                    <ul class="flex gap-16 text-white/50">
                        <Motion.li
                            class="hover:text-white cursor-pointer"
                            onMouseOver={() => setActive && setActive()}
                            onMouseLeave={() => setInactive && setInactive()}
                            initial={{ y: -10, x: -20, opacity: 0 }}
                            animate={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0 }}
                        >
                            <A href="/" activeClass="text-white" end>首页</A>
                        </Motion.li>
                        <Motion.li
                            class="hover:text-white cursor-pointer"
                            onMouseOver={() => setActive && setActive()}
                            onMouseLeave={() => setInactive && setInactive()}
                            initial={{ y: -10, x: -20, opacity: 0 }}
                            animate={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <A href="/album" activeClass="text-white">作品集</A>
                        </Motion.li>
                        {/* <Show when={authed()}> */}
                        <Motion.li
                            class="hover:text-white cursor-pointer"
                            onMouseOver={() => setActive && setActive()}
                            onMouseLeave={() => setInactive && setInactive()}
                            initial={{ y: -10, x: -20, opacity: 0 }}
                            animate={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <A href="/admin" target="_blank" activeClass="text-white">后台</A>
                        </Motion.li>
                        {/* </Show> */}
                        <Motion.li
                            class="hover:text-white cursor-pointer"
                            onMouseOver={() => setActive && setActive()}
                            onMouseLeave={() => setInactive && setInactive()}
                            initial={{ y: -10, x: -20, opacity: 0 }}
                            animate={{ y: 0, x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <A href="https://github.com/zxdstyle/pixfolio" target="_blank" activeClass="text-white">GITHUB</A>
                        </Motion.li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
