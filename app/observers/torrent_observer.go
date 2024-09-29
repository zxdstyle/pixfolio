package observers

import (
	"github.com/goravel/framework/contracts/database/orm"
)

type TorrentObserver struct {
}

func (u *TorrentObserver) Retrieved(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Creating(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Created(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Updating(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Updated(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Saving(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Saved(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Deleting(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) Deleted(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) ForceDeleting(event orm.Event) error {
	return nil
}

func (u *TorrentObserver) ForceDeleted(event orm.Event) error {
	return nil
}
