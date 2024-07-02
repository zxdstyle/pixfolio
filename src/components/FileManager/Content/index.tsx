import { Flex } from 'antd'
import useDataSource from '../hooks/useDataSource'
import Footer from './Footer'
import Overview from './Overview'
import GridView from './GridView'
import Navbar from './Navbar'

export default function () {
    return (
        <Content />
    )
}

function Content() {
    const { data } = useDataSource()

    return (
        <Flex vertical className="h-full w-full">
            <Navbar />

            <div className=" flex-1 overflow-y-auto relative">
                <GridView data={data} />
                <Overview />
            </div>

            <Footer />
        </Flex>

    )
}
