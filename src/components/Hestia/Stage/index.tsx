import { Application, useAsset, useExtend } from '@pixi/react'
import { Sprite, Texture } from 'pixi.js'
import { useRef } from 'react'

interface StageProps {
    src: string
}

export default function ({ src }: StageProps) {
    const box = useRef<HTMLDivElement | null>(null)

    useExtend({ Sprite, Texture })

    const texture: Texture = useAsset({ src })

    return (
        <div ref={box} className="absolute w-full h-full overflow-hidden">
            <Application resizeTo={box} backgroundAlpha={0}>
                <sprite
                    anchor={0.5}
                    texture={texture}
                    position={{
                        x: imageWidth / 2,
                        y: imageHeight / 2,
                    }}
                />
            </Application>
        </div>
    )
}
