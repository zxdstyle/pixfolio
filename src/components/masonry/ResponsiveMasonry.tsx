import type { CSSProperties, ReactElement } from 'react'
import { Children, cloneElement, useMemo } from 'react'
import { useWindowWidth } from './utils'

export interface ResponsiveMasonryProps {
    className?: string
    style?: CSSProperties
    children?: ReactElement
    columnsCountBreakPoints?: Record<number, number>
}

const DEFAULT_COLUMNS_COUNT = 1
const DEFAULT_COLUMNS_COUNT_BREAK_POINTS = { 350: 1, 750: 2, 900: 3 }

export function ResponsiveMasonry({ children, className, style, columnsCountBreakPoints = DEFAULT_COLUMNS_COUNT_BREAK_POINTS }: ResponsiveMasonryProps) {
    const windowWidth = useWindowWidth()
    const columnsCount = useMemo(() => {
        const breakPoints = Object.keys(columnsCountBreakPoints).sort(
            (a, b) => Number(a) - Number(b),
        )
        let count
            = breakPoints.length > 0
                ? columnsCountBreakPoints[Number(breakPoints[0])]
                : DEFAULT_COLUMNS_COUNT

        breakPoints.forEach((breakPoint) => {
            if (Number(breakPoint) < windowWidth) {
                count = columnsCountBreakPoints[Number(breakPoint)]
            }
        })

        return count
    }, [windowWidth, columnsCountBreakPoints])

    return (
        <div className={className} style={style}>
            {Children.map(children, (child) => {
                return cloneElement(child as ReactElement, { columnsCount })
            })}
        </div>
    )
}
