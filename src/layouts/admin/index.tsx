import { Outlet } from 'react-router-dom'
import AntdProvider from './providers/AntdProvider'
import RefineProvider from './providers/RefineProvider'
import Header from './Header'
import styles from './styles/style.module.less'
import Breadcrumb from './Breadcrumb'

export function Component() {
    return (
        <AntdProvider>
            <RefineProvider>
                <div className={styles.wrapper}>
                    <Header />

                    <Breadcrumb />

                    <main className="relative container">
                        <Outlet />
                    </main>
                </div>
            </RefineProvider>
        </AntdProvider>
    )
}
