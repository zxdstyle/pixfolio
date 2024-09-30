package controllers

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/controllers/base"
	"github.com/zxdstyle/pixfolio/app/http/repositories"
	"github.com/zxdstyle/pixfolio/app/http/responses"
	"github.com/zxdstyle/pixfolio/app/models"
)

type AlbumHasPhoto struct {
	*base.Controller[models.AlbumHasPhoto, uint64]
}

func NewAlbumHasPhoto() *AlbumHasPhoto {
	p := &AlbumHasPhoto{}

	p.Controller = base.NewBaseController[models.AlbumHasPhoto, uint64](
		repositories.NewAlbumHasPhoto(),
		base.Uint64Converter,
	)
	return p
}

func (r *AlbumHasPhoto) Store(ctx http.Context) http.Response {
	var (
		m   models.AlbumHasPhoto
		err error
	)
	if err = ctx.Request().Bind(&m); err != nil {
		return responses.Error(ctx, err)
	}

	if err := facades.Orm().WithContext(ctx).Query().FirstOrCreate(&m, m, m); err != nil {
		return responses.Error(ctx, err)
	}

	return responses.Success(ctx, m)
}
