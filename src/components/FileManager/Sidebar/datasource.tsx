import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Section from './section'
import { SeeMore } from './SeeMore'

export default function () {
    const [locations] = useState([
        { id: 1, name: 'icarus', online: false },
        { id: 2, name: 'rank', online: true },
    ])

    return (
        <Section
            name="DataSource"
            actionArea={(
                <Link to="settings/library/locations">
                    <Button />
                </Link>
            )}
        >
            <SeeMore>
                {
                    locations.map(location => (
                        <Link key={location.id} to={`location/${location.id}`} className={clsx('border radix-state-open:border-accent', 'border-transparent')}>
                            <div className="relative mr-1 shrink-0 grow-0">
                                {/* <DatabaseIcon size={18} /> */}
                                <div className={
                                    clsx('absolute bottom-0.5 right-0 h-1.5 w-1.5 rounded-full', location.online ? 'bg-green-500' : 'bg-red-500')
                                }
                                />
                            </div>

                            <span className="truncate">{location.name}</span>
                        </Link>
                    ))
                }
            </SeeMore>
            <AddTableButton />
        </Section>
    )
}

function AddTableButton() {
    return (
        <Button className={clsx('w-full mt-1')}>
            Add Location
        </Button>
    )
}
