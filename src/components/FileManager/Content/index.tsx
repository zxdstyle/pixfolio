import { Flex, Spin } from 'antd'
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
    const { data, isFetching } = useDataSource()

    return (

        <Flex vertical className="h-full w-full">
            <Navbar />

            <div className="h-full flex-1 overflow-hidden relative">
                <Spin spinning={isFetching}>
                    <GridView data={data} />
                </Spin>
                <Overview />
            </div>

            <Footer />
        </Flex>

    )
}
