import clsx from 'clsx'
import { Button } from 'antd'
import Cartoon from '@/assets/images/cartoon.svg'

interface Props {
    className?: string
}
export default function Profile({ className }: Props) {
    return (
        <div className={clsx('rounded-3xl relative shadow-2xl shadow-slate-500', className)}>
            <div className="w-full h-full rounded-3xl p-7 text-white bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500">
                <div className="w-2/3">
                    <h4 className="font-semibold text-2xl">Welcome to cuba</h4>
                    <p>Here whats happing in your account today</p>

                    <Button size="large" ghost className="mt-7">Whats New !</Button>
                </div>
            </div>
            <div className="absolute bottom-0 -mb-5 -right-5 animate-bounce-slow">
                <img src={Cartoon} className="w-56" alt="cartoon" />
            </div>
        </div>
    )
}
