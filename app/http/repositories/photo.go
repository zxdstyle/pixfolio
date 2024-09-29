package repositories

import (
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/models"
)

type Photo struct {
	*base.Crud[models.Photo, uint64]
}

func NewPhoto() *Photo {
	return &Photo{
		Crud: base.NewCrud[models.Photo, uint64](),
	}
}
