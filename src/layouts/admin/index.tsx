import { Outlet } from 'react-router-dom'
import AntdProvider from './providers/AntdProvider'
import RefineProvider from './providers/RefineProvider'
import Header from './Header'
import styles from './styles/style.module.less'

export function Component() {
    return (
        <AntdProvider>
            <RefineProvider>
                <div className={styles.wrapper}>
                    <Header />

                    <main className="relative container">
                        <Outlet />
                    </main>
                </div>
            </RefineProvider>
        </AntdProvider>
    )
}
