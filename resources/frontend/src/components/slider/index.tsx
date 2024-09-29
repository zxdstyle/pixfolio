import type { Variant } from '@motionone/dom'
import { createSignal, For, mergeProps, onMount, Show } from 'solid-js'
import { Motion, Presence } from 'solid-motionone'

interface Props {
    images: string[]
    duration?: number // 毫秒
    class?: string
}
interface Variants {
    initial: Variant
    animate: Variant
    exit: Variant
}

const scaleUp: Variants = {
    initial: { scale: 1.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { opacity: 0 },
}
const scaleDown: Variants = {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: 1.5, opacity: 1 },
    exit: { opacity: 0 },
}

function chooseCorner(width: number, height: number, scale: number) {
    let ratio = height / width
    let sw = Math.floor(width * (1 / scale))
    let sh = Math.floor(width * ratio * (1 / scale))

    let w = width
    let h = height

    let corners = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ]

    let choice = Math.floor(Math.random() * 4)
    let start = corners[choice]

    corners.splice(choice, 1)
    let end = corners[Math.floor(Math.random() * 3)]

    return {
        startX: start.x * (w - sw * scale),
        startY: start.y * (h - sh * scale),
        endX: end.x * (w - sw),
        endY: end.y * (h - sh),
    }
}

export default function Slider(_props: Props) {
    const props = mergeProps({ duration: 10000 }, _props)
    const [current, setCurrent] = createSignal(0)

    onMount(() => {
        const id = setInterval(() => {
            setCurrent((pre) => {
                if (pre >= props.images.length - 1) {
                    return 0
                }
                return pre + 1
            })
        }, props.duration)
        return () => clearInterval(id)
    })

    let box: undefined | HTMLUListElement

    return (
        <ul class="w-full h-full absolute" ref={box}>
            <Show when={box}>
                <For each={props.images}>
                    {(item, idx) => {
                        const corner = () => chooseCorner(box.offsetWidth, box.offsetHeight, 1)
                        const initial = (): Variant => (current() % 2 === 0 ? scaleUp.initial : scaleDown.initial)
                        const animate = (): Variant => (current() % 2 === 0 ? scaleUp.animate : scaleDown.animate)
                        const exit = (): Variant => (current() % 2 === 0 ? scaleUp.exit : scaleDown.exit)

                        return (
                            <Presence exitBeforeEnter>
                                <Show when={idx() === current()}>
                                    <Motion.li
                                        class="absolute w-full h-full"
                                        initial={{
                                            ...initial(),
                                            x: corner().startX,
                                            y: corner().startY,
                                        }}
                                        animate={{ ...animate(), x: corner().endX, y: corner().endY }}
                                        exit={exit()}
                                        transition={{ duration: props.duration / 1000 }}
                                    >
                                        <div
                                            class="w-screen h-screen bg-center bg-cover"
                                            style={{ 'background-image': `url(${item})` }}
                                        />
                                    </Motion.li>
                                </Show>
                            </Presence>
                        )
                    }}
                </For>
            </Show>
        </ul>
    )
}
