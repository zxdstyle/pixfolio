import CountUp from 'react-countup'
import StatsCard from './Stats'

interface Props {
    className?: string
}

export default function Album({ className }: Props) {
    return (
        <StatsCard
            className={className}
            uri="/album"
            color="blue"
            icon={<IconSolarAlbumLinear slot="icon" className="text-white text-3xl" />}
        >
            <h1 className="text-3xl w-32 overflow-hidden text-ellipsis">
                <CountUp end={123213} />
            </h1>
            <h2 className="text-gray-500">相册</h2>
        </StatsCard>
    )
}
