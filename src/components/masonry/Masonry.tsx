import type { CSSProperties, PropsWithChildren, ReactElement } from 'react'
import { Children, isValidElement, useMemo } from 'react'

export interface MasonryProps {
    gutter?: string | number
    className?: string
    style?: CSSProperties
    columnsCount?: number
}

export function Masonry({ columnsCount = 3, gutter = 0, style, className, children }: PropsWithChildren<MasonryProps>) {
    const getColumns = () => {
        const columns: ReactElement[][] = Array.from({ length: columnsCount }, () => [])
        let validIndex = 0
        Children.forEach(children, (child) => {
            if (child && isValidElement(child)) {
                columns[validIndex % columnsCount].push(child)
                validIndex++
            }
        })
        return columns
    }

    const columns = useMemo(() => {
        return getColumns().map((column, i) => (
            <div
                key={i}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignContent: 'stretch',
                    flex: 1,
                    width: 0,
                    gap: gutter,
                }}
            >
                {column}
            </div>
        ))
    }, [getColumns, gutter])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'stretch',
                boxSizing: 'border-box',
                width: '100%',
                gap: gutter,
                ...style,
            }}
            className={className}
        >
            {columns}
        </div>
    )
}
