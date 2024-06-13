import clsx from 'clsx'
import { Button, Card } from 'antd'
import Cartoon from '@/assets/images/cartoon.svg'

interface Props {
    className?: string
}
export default function Profile({ className }: Props) {
    return (
        <Card className={clsx('rounded-3xl relative', className)} styles={{ body: { padding: 0, position: 'relative', height: '100%' } }} bordered={false}>
            <div className="w-full h-full rounded-3xl p-7 text-white" style={{ background: 'linear-gradient(103.75deg, #33B1EE -13.9%, hsl(245 100% 70%) 79.68%)' }}>
                <div className="w-2/3">
                    <h4 className="font-semibold text-2xl">Welcome to cuba</h4>
                    <p>Here whats happing in your account today</p>

                    <Button size="large" ghost className="mt-7">Whats New !</Button>
                </div>
            </div>
            <div className="absolute bottom-0 -mb-5 -right-5 animate-bounce-slow">
                <img src={Cartoon} className="w-56" alt="cartoon" />
            </div>
        </Card>
    )
}
