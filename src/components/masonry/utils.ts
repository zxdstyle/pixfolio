import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const useIsomorphicLayoutEffect
    = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)
    useIsomorphicLayoutEffect(() => {
        setHasMounted(true)
    }, [])

    return hasMounted
}

export function useWindowWidth() {
    const hasMounted = useHasMounted()
    const [width, setWidth] = useState(window.innerWidth)

    const handleResize = useCallback(() => {
        if (!hasMounted)
            return
        setWidth(window.innerWidth)
    }, [hasMounted])

    useIsomorphicLayoutEffect(() => {
        if (hasMounted) {
            window.addEventListener('resize', handleResize)
            handleResize()
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [hasMounted, handleResize])

    return width
}
