import GridItem from './GridItem'

interface GridViewProps {
    data?: FileDescription[]
}

export default function GridView({ data = [] }: GridViewProps) {
    return (
        <ul className="flex flex-wrap gap-x-4 gap-y-4 h-full overflow-auto content-start">
            {data.map(item => <GridItem item={item} key={item.name} />)}
        </ul>
    )
}
