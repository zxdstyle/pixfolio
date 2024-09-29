import { Motion } from 'solid-motionone'

export default function Footer() {
    return (
        <footer class="z-50 w-full fixed bottom-0 left-0 right-0 flex justify-between py-6 px-20">
            <div />
            <Motion.div
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                class="text-white/50 font-bold text-sm"
            >
                Copyright © 2024. Pixfolio All Rights Reserved.
            </Motion.div>
        </footer>
    )
}
