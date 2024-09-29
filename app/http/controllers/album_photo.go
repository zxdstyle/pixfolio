package controllers

import (
	contracts "github.com/goravel/framework/contracts/database/orm"
	"github.com/goravel/framework/contracts/http"
	"github.com/spf13/cast"
	"github.com/zxdstyle/pixfolio/app/http/controllers/base"
	"github.com/zxdstyle/pixfolio/app/http/repositories"
	baseRepo "github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/models"
)

type AlbumPhoto struct {
	*base.Controller[models.Photo, uint64]
}

func NewAlbumPhoto() *AlbumPhoto {
	p := &AlbumPhoto{}

	p.Controller = base.NewBaseController[models.Photo, uint64](
		repositories.NewPhoto(),
		base.Uint64Converter,
		base.WithRouteKey[models.Photo, uint64]("photo_id"),
		base.WithBeforeFind[models.Photo, uint64](p.beforeFind),
	)
	return p
}

func (p *AlbumPhoto) beforeFind(ctx http.Context, filters *[]baseRepo.Filter) error {
	albumId := cast.ToUint64(ctx.Request().Route("id"))
	*filters = append(*filters, baseRepo.BuildCustomFilter(func(tx contracts.Query) contracts.Query {
		return tx.Join("LEFT JOIN `album_has_photos` ON `album_has_photos`.`photo_id` = `photos`.`id`").
			Where("`album_id` = ?", albumId)
	}))

	return nil
}
