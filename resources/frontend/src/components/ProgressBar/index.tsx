import { createElementSize } from '@solid-primitives/resize-observer'
import clsx from 'clsx'
import { createMemo, createSignal } from 'solid-js'
import { Motion } from 'solid-motionone'

interface ProgressBarProps {
    percent: number
    class?: string
}

export default function ProgressBar(props: ProgressBarProps) {
    const [box, setBox] = createSignal<HTMLDivElement>()

    const size = createElementSize(box)

    const width = createMemo(() => {
        return (size.width * props.percent).toFixed(2)
    })

    return (
        <div ref={el => setBox(el)} class={clsx('h-1 bg-[#313133] relative', props.class)}>
            <Motion.div class="h-1 bg-white" animate={{ width: `${width()}px` }} transition={{ duration: 0.2 }} />
        </div>
    )
}
