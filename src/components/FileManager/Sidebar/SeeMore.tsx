import type { ReactNode } from 'react'
import { Children, useState } from 'react'

export const SEE_MORE_COUNT = 5

interface Props {
    limit?: number
    children?: ReactNode
}

export function SeeMore({ limit = SEE_MORE_COUNT, children }: Props) {
    const [seeMore, setSeeMore] = useState(false)

    const childrenArray = Children.toArray(children)

    return (
        <>
            {
                childrenArray.map((child, i) => {
                    return seeMore || i < limit ? child : null
                })
            }

            {childrenArray.length > limit && (
                <div
                    onClick={() => setSeeMore(pre => !pre)}
                    className="mb-1 ml-2 mt-0.5 cursor-pointer text-center text-tiny font-semibold text-ink-faint/50 transition hover:text-accent"
                >
                    See
                    {' '}
                    {seeMore ? 'less' : 'more'}
                </div>
            )}
        </>
    )
}
