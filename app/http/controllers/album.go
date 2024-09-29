package controllers

import (
	"errors"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/database/orm"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/controllers/base"
	"github.com/zxdstyle/pixfolio/app/http/repositories"
	"github.com/zxdstyle/pixfolio/app/models"
)

type Album struct {
	*base.Controller[models.Album, uint64]
	ahp *repositories.AlbumHasPhoto
}

func NewAlbum() *Album {
	a := &Album{
		ahp: repositories.NewAlbumHasPhoto(),
	}

	a.Controller = base.NewBaseController[models.Album, uint64](
		repositories.NewAlbum(),
		base.Uint64Converter,
		base.WithBeforeEdit[models.Album, uint64](a.beforeEdit),
	)
	return a
}

func (a *Album) beforeEdit(ctx http.Context, id uint64, m models.Album) (models.Album, error) {
	if m.CoverId > 0 {
		var (
			ahq models.AlbumHasPhoto
			err = facades.Orm().WithContext(ctx).Query().Where("`album_id` = ? AND `photo_id` = ?", id, m.CoverId).FindOrFail(&ahq)
		)
		if errors.Is(err, orm.ErrRecordNotFound) {
			return m, errors.New("photo not found")
		}
	}
	return m, nil
}
