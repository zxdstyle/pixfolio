import { Avatar } from 'antd'
import GiftTools from '@/assets/images/giftools.gif'

export default function Header() {
    return (
        <header className="container">
            <div className="relative flex items-center justify-between py-5">
                <div>
                    <div className="flex items-center h-full">
                        <img alt="gif" className="-mt-2 mr-6" src={GiftTools} />
                        <h6 className="m-0 text-white text-base">
                            <span>Don't Miss Out!</span>
                            <span>Out new update has been release.</span>
                        </h6>
                    </div>
                </div>

                <div>
                    <Avatar size="large" src="https://github.com/shadcn.png" />
                </div>
            </div>
        </header>
    )
}
