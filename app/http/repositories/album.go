package repositories

import (
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/models"
)

type Album struct {
	*base.Crud[models.Album, uint64]
}

func NewAlbum() *Album {
	return &Album{
		Crud: base.NewCrud[models.Album, uint64](),
	}
}
