import { Masonry, ResponsiveMasonry } from '@/components/masonry'

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function Component() {
    const images = Array.from({ length: 40 }).map(() => `https://placehold.co/600x${getRandomNumber(300, 1600)}`)

    return (
        <div className="container">
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5 }}>
                <Masonry gutter="10px">
                    {images.map((image, index) => (
                        <div className="overflow-hidden rounded-xl" key={index}>
                            <img
                                className="rounded-xl"
                                key={index}
                                src={image}
                                alt=""
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
