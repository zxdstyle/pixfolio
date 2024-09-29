import type { JSX } from 'solid-js'
import { CursorContext } from '@/layouts/context/cursor'
import { RouterStateContext } from '@/layouts/context/router'
import { A } from '@solidjs/router'
import clsx from 'clsx'
import { createEffect, createSignal, mergeProps, Show, useContext } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Motion, Presence } from 'solid-motionone'

interface Props {
    title: JSX.Element
    href?: string
    subTitle: JSX.Element
    class?: string
    position?: 'top' | 'center' | 'bottom'
    onClick?: () => void
}

export default function NavLine(_props: Props): JSX.Element {
    const props = mergeProps({ position: 'center' }, _props)

    const { setActive, setInactive } = useContext(CursorContext)

    const { leaving } = useContext(RouterStateContext)

    const [linkActive, setLinkActive] = createSignal(false)

    createEffect(() => {
        if (leaving()) {
            setInactive()
        }
    })

    return (
        <div class={clsx('fixed h-full flex', props.class)}>
            <Presence exitBeforeEnter>
                <Show when={!leaving()}>
                    <Motion.div
                        class="h-0 border-r border-white/15 translate-x-5"
                        animate={{ height: '100vh', transition: { duration: 1.5 } }}
                        exit={{ height: 0 }}
                    />
                </Show>
            </Presence>

            <div
                classList={{
                    'flex flex-col h-full py-32': true,
                    'justify-center': props.position === 'center',
                    'justify-end': props.position === 'bottom',
                }}
            >
                <Dynamic
                    component={props.href ? A : 'div'}
                    classList={{ 'group': !!props.href || !!props.onClick, 'cursor-pointer': true }}
                    onMouseOver={() => {
                        if (!!props.href || !!props.onClick) {
                            setActive()
                            setLinkActive(true)
                        }
                    }}
                    onMouseLeave={() => {
                        if (!!props.href || !!props.onClick) {
                            setInactive()
                            setLinkActive(false)
                        }
                    }}
                    {...{ href: props.href, onClick: props.onClick }}
                >
                    <Presence exitBeforeEnter>
                        <Show when={!leaving()}>
                            <Motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{
                                    y: linkActive() ? 30 : 50,
                                    opacity: 1,
                                }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{
                                    duration: linkActive() ? 0.6 : 1,
                                    delay: linkActive() ? 0 : 0.4,
                                }}
                                class="uppercase font-bold text-white/60 text-sm group-hover:text-white"
                                style={{ 'writing-mode': 'vertical-rl' }}
                            >
                                {props.subTitle}
                            </Motion.div>
                        </Show>
                    </Presence>

                    <Presence exitBeforeEnter>
                        <Show when={!leaving()}>
                            <Motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{
                                    y: linkActive() ? 20 : 0,
                                    opacity: 1,
                                }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{
                                    duration: linkActive() ? 0.6 : 1,
                                    delay: linkActive() ? 0 : 0.4,
                                }}
                                class="text-5xl ml-5 font-bold text-white/60 uppercase group-hover:text-white"
                                style={{ 'writing-mode': 'vertical-rl' }}
                            >
                                {props.title}
                            </Motion.div>
                        </Show>
                    </Presence>
                </Dynamic>
            </div>
        </div>
    )
}
