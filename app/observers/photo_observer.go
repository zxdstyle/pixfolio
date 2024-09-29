package observers

import (
	"github.com/goravel/framework/contracts/database/orm"
	"github.com/spf13/cast"
	"github.com/zxdstyle/pixfolio/app/http/logic/compress"
)

type PhotoObserver struct {
}

func (u *PhotoObserver) Retrieved(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Creating(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Created(event orm.Event) error {
	source := cast.ToString(event.GetAttribute("filename"))
	photoId := cast.ToUint64(event.GetAttribute("ID"))

	compress.Instance.Compress(photoId, source)
	return nil
}

func (u *PhotoObserver) Updating(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Updated(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Saving(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Saved(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Deleting(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) Deleted(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) ForceDeleting(event orm.Event) error {
	return nil
}

func (u *PhotoObserver) ForceDeleted(event orm.Event) error {
	return nil
}
