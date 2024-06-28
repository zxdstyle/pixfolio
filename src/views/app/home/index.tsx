import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './styles/home.module.less'

export function Component() {
    const [images] = useState([
        'https://images.pexels.com/photos/20768992/pexels-photo-20768992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/20605560/pexels-photo-20605560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/20725733/pexels-photo-20725733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/20736496/pexels-photo-20736496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ])
    const sliders = useRef<HTMLDivElement>(null)
    const thumbnail = useRef<HTMLDivElement>(null)
    let runTimeOut: NodeJS.Timeout

    const [action, setAction] = useState('')
    function showSlider(type: 'next' | 'prev') {
        if (!sliders.current || !thumbnail.current)
            return

        if (type === 'next') {
            sliders.current.appendChild(sliders.current.childNodes[0])
            thumbnail.current.appendChild(thumbnail.current.childNodes[0])
        }
        else {
            sliders.current.prepend(sliders.current.childNodes[sliders.current.childNodes.length - 1])
            thumbnail.current.prepend(thumbnail.current.childNodes[thumbnail.current.childNodes.length - 1])
        }

        setAction(type)
        clearTimeout(runTimeOut)
        runTimeOut = setTimeout(() => {
            setAction('')
        }, 1000)
    }

    useEffect(() => {
        thumbnail.current?.appendChild(thumbnail.current.childNodes[0])
    }, [])
    return (
        <div
            className={clsx(styles.carousel, {
                [styles.prev]: action === 'prev',
                [styles.next]: action === 'next',
            })}
        >
            <div className={styles.list} ref={sliders}>
                {images.map((item, i) => (
                    <div className={styles.item} key={i}>
                        <img src={item} alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/20">
                            <div className={styles.content}>
                                <div className={styles.author}>LUNDEV</div>
                                <div className={styles.title}>DESIGN SLIDER</div>
                                <div className={styles.topic}>ANIMAL</div>
                                <div className={styles.des}>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                                </div>
                                <div className={styles.buttons}>
                                    <button>SEE MORE</button>
                                    <button>SUBSCRIBE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.thumbnail} ref={thumbnail}>
                {images.map((item, i) => (
                    <div className={styles.item} key={i}>
                        <img src={item} />
                        <div className={styles.content}>
                            <div className={styles.title}>
                                Name Slider
                            </div>
                            <div className={styles.description}>
                                Description
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="absolute bottom-20 left-52 z-20 flex gap-3 text-white">
                <button onClick={() => showSlider('prev')} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/80 hover:bg-white hover:text-black">
                    <IconPhCaretLeftBold />
                </button>
                <button onClick={() => showSlider('next')} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/80 hover:bg-white hover:text-black">
                    <IconPhCaretRightBold />
                </button>
            </div>

            <div className="time"></div>
        </div>
    )
}
