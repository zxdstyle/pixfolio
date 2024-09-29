package controllers

import (
	"github.com/golang-module/dongle"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/controllers/base"
	"github.com/zxdstyle/pixfolio/app/http/repositories"
	"github.com/zxdstyle/pixfolio/app/http/responses"
	"github.com/zxdstyle/pixfolio/app/models"
)

type Photo struct {
	*base.Controller[models.Photo, uint64]
}

func NewPhoto() *Photo {
	p := &Photo{}

	p.Controller = base.NewBaseController[models.Photo, uint64](
		repositories.NewPhoto(),
		base.Uint64Converter,
	)
	return p
}

func (p *Photo) Store(ctx http.Context) http.Response {
	var (
		m   models.Photo
		err error
	)
	if err = ctx.Request().Bind(&m); err != nil {
		return responses.Error(ctx, err)
	}

	if err := p.doStore(ctx, &m); err != nil {
		return nil
	}

	return responses.Success(ctx, m)
}

func (p *Photo) doStore(ctx http.Context, m *models.Photo) error {
	file, err := ctx.Request().File("file")
	if err != nil {
		return err
	}

	path, err := file.Store("photos")
	if err != nil {
		return err
	}

	size, err := file.Size()
	if err != nil {
		return err
	}

	ext, err := file.Extension()
	if err != nil {
		return err
	}

	rawFile, err := facades.Storage().Get(path)
	if err != nil {
		return err
	}
	md5 := dongle.Encrypt.FromString(rawFile).ByMd5().ToHexString()
	return facades.Orm().WithContext(ctx).Query().FirstOrCreate(
		m,
		models.Photo{Md5: md5},
		models.Photo{
			Size:         size,
			OriginalName: file.GetClientOriginalName(),
			Filename:     path,
			Ext:          ext,
		},
	)
}
