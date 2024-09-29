import type { JSX } from 'solid-js'
import Lenis from 'lenis'
import { onMount } from 'solid-js'

interface Props {
    children?: JSX.Element
}

export default function SmoothScroll(props: Props) {
    let box: HTMLDivElement | undefined
    onMount(() => {
        if (!box)
            return
        const lenis = new Lenis({
            wrapper: box,
            lerp: 0.05,
            easing: x => 1 - (1 - x) ** 4,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    })

    return (
        <div ref={box} class="h-full w-full overflow-auto">
            <div class="h-full">{props.children}</div>
        </div>
    )
}
