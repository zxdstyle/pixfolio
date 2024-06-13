import ProfileCard from './cards/Profile'
import AlbumCard from './cards/Album'
import SettingCard from './cards/Setting'
import StorageCard from './cards/Storage'

export function Component() {
    return (
        <div className="w-full grid grid-cols-12 gap-6">
            <ProfileCard className="col-span-4" />
            <div className="col-span-8 grid grid-cols-3 gap-6">
                <div className="h-full flex flex-col justify-between gap-3">
                    <AlbumCard />
                    <StorageCard />
                </div>
                <div className="h-full flex flex-col justify-between gap-3">
                    <SettingCard />
                </div>
            </div>
        </div>
    )
}
