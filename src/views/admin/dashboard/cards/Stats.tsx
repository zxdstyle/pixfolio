import { Card } from 'antd'
import type { PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from '../styles/card.module.less'

interface Props {
    uri: string
    icon: ReactNode
    className?: string
    color: 'blue' | 'green' | 'indigo' | 'purple' | 'red' | 'orange'
}
export default function Stats({ uri, icon, children, color = 'blue', className }: PropsWithChildren<Props>) {
    return (
        <Card className={clsx('rounded-3xl shadow-2xl shadow-slate-200', className)}>
            <Link className="flex gap-10" to={uri}>
                <button
                    type="button"
                    className={clsx(styles.statsCard, {
                        [styles.statsCardOrange]: color === 'orange',
                        [styles.statsCardBlue]: color === 'blue',
                        [styles.statsCardGreen]: color === 'green',
                        [styles.statsCardIndigo]: color === 'indigo',
                        [styles.statsCardPurple]: color === 'purple',
                        [styles.statsCardRed]: color === 'red',
                    })}
                >
                    <span className={styles.statsCardBack}></span>
                    <span className={clsx(styles.statsCardFront, 'flex items-center justify-center')}>
                        {icon}
                    </span>
                </button>

                <div className="flex flex-col justify-center">
                    {children}
                </div>
            </Link>
        </Card>
    )
}
