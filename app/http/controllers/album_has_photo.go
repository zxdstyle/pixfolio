package controllers

import (
	"github.com/zxdstyle/pixfolio/app/http/controllers/base"
	"github.com/zxdstyle/pixfolio/app/http/repositories"
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
