import type { PropsWithChildren } from 'react'
import type { I18nProvider } from '@refinedev/core'
import { Refine } from '@refinedev/core'
import routerProvider from '@refinedev/react-router-v6'
import { useNotificationProvider } from '@refinedev/antd'
import { useTranslation } from 'react-i18next'
import { dataProvider } from '@/utils/request'

export default function RefineProvider({ children }: PropsWithChildren) {
    const { t, i18n } = useTranslation()

    const i18nProvider: I18nProvider = {
        translate: key => t(key),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    }

    return (
        <Refine
            dataProvider={dataProvider('/api/v1')}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            i18nProvider={i18nProvider}
            resources={[
                {
                    name: 'dashboard',
                    list: '/dashboard',
                },
                {
                    name: 'storage',
                    list: '/storages',
                    show: '/storages/:id',
                    meta: { icon: <IconIconParkOutlineCloudStorage />, parent: 'dashboard' },
                },
                {
                    name: 'album',
                    list: '/albums',
                    show: '/albums/:id',
                    meta: { icon: <IconSolarAlbumBroken />, parent: 'dashboard' },
                },
            ]}
        >
            {children}
        </Refine>
    )
}
