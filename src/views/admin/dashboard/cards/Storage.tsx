import CountUp from 'react-countup'
import StatsCard from './Stats'

interface Props {
    className?: string
}

export default function Storage({ className }: Props) {
    return (
        <StatsCard
            className={className}
            color="indigo"
            uri="/storages"
            icon={<IconBiDeviceHdd slot="icon" className="text-white text-3xl" />}
        >
            <h1 className="text-3xl w-32 overflow-hidden text-ellipsis">
                <CountUp end={3} />
            </h1>
            <h2 className="text-gray-500">存储器</h2>
        </StatsCard>
    )
}
