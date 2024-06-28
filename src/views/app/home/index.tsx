import mapbox from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxLanguage from '@mapbox/mapbox-gl-language'

mapbox.accessToken = 'pk.eyJ1IjoiZGFuZHl3ZW5nIiwiYSI6ImNqaDRrdTN1MTEydG0zM3J5aWNtd3M0d3kifQ.cxBsW_3CNw-NGPoMjoCPQQ'

export function Component() {
    const map = useRef<mapbox.Map | null>(null)
    const mapContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (map.current || !mapContainer.current)
            return

        map.current = new mapbox.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/light-v9`,
            // center: [lng, lat],
            // zoom,
        })
        const language = new MapboxLanguage({ defaultLanguage: 'zh-Hans' })
        map.current.addControl(language)
    }, [])
    return (
        <div style={{ width: '100vw', height: '100vh' }} ref={mapContainer}></div>
    )
}
