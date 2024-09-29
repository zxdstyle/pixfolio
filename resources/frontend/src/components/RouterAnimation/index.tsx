import type { JSX } from 'solid-js'
import type { Options } from 'solid-motionone'
import { RouterStateContext } from '@/layouts/context/router'
import { Show, splitProps, useContext } from 'solid-js'
import { Motion, Presence } from 'solid-motionone'

interface Props extends Options {
    children?: JSX.Element
    class?: string
    style?: JSX.CSSProperties
}

export default function RouterAnimation(_props: Props) {
    const [props, rest] = splitProps(_props, ['children'])
    const { leaving } = useContext(RouterStateContext)
    return (
        <Presence exitBeforeEnter>
            <Show when={!leaving()}>
                <Motion.div {...rest}>{props.children}</Motion.div>
            </Show>
        </Presence>
    )
}
