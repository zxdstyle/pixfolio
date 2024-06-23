import type { ReactNode } from 'react'

interface Props {
    name: string
    actionArea?: ReactNode
    children?: ReactNode
}

export default function (props: Props) {
    return (
        <div className="group">
            <div className="mb-1 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-ink-dull ml-1">{props.name}</h3>
                {
                    props.actionArea
                    && (
                        <div className="text-sidebar-inkFaint opacity-0 transition-all duration-300 hover:!opacity-100 group-hover:opacity-30">
                            {props.actionArea}
                        </div>
                    )
                }
            </div>
            {props.children}
        </div>
    )
}
