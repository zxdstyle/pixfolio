import { Masonry, ResponsiveMasonry } from '@/components/masonry'

export default function ({ images }: { images: string[] }) {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5 }}>
            <Masonry gutter="10px">
                {
                    images.map((image, index) => (
                        <div className="overflow-hidden rounded-xl" key={index}>
                            <img
                                className="rounded-xl"
                                key={index}
                                src={image}
                                alt=""
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                    ))
                }
            </Masonry>
        </ResponsiveMasonry>
    )
}
