import { Breadcrumb } from '@refinedev/antd'
import { Flex, Typography } from 'antd'
import { useResource } from '@refinedev/core'
import { useTranslation } from 'react-i18next'

export default function () {
    const { resource } = useResource()

    const { t } = useTranslation()

    return (
        <Flex justify="space-between" className="h-14">
            <Typography.Title level={3} className="!text-white flex gap-2">
                {resource?.meta?.icon}
                {resource && t(`${resource.name}.${resource.name}`)}
            </Typography.Title>
            <Breadcrumb hideIcons showHome />
        </Flex>
    )
}
