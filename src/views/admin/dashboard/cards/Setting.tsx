import StatsCard from './Stats'

interface Props {
    className?: string
}

export default function Setting({ className }: Props) {
    return (
        <StatsCard
            className={className}
            color="orange"
            uri="/settings"
            icon={<IconMaterialSymbolsSettingsSuggestOutline slot="icon" className="text-white text-3xl" />}
        >
            <h1 className="text-2xl w-32 overflow-hidden text-ellipsis">
                配置中心
            </h1>
        </StatsCard>
    )
}
