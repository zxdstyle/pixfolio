import type { JSX } from 'solid-js'
import { RouterStateProvider } from '@/layouts/context/router'
import Cursor from './component/Cursor'
import Footer from './component/Footer'
import Header from './component/Header'

interface IndexProps {
    children?: JSX.Element
}

export default function Index(props: IndexProps) {
    return (
        <RouterStateProvider>
            <Cursor>
                <Header />

                <main class="w-full h-full">{props.children}</main>

                <Footer />
            </Cursor>
        </RouterStateProvider>
    )
}
