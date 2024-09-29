package repositories

import (
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/models"
)

type AlbumHasPhoto struct {
	*base.Crud[models.AlbumHasPhoto, uint64]
}

func NewAlbumHasPhoto() *AlbumHasPhoto {
	return &AlbumHasPhoto{
		Crud: base.NewCrud[models.AlbumHasPhoto, uint64](),
	}
}
