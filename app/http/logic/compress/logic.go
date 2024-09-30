package compress

import (
	"fmt"
	"github.com/davidbyttow/govips/v2/vips"
	"github.com/goravel/framework/facades"
	"github.com/panjf2000/ants/v2"
	"github.com/zxdstyle/pixfolio/app/models"
)

var Instance = New()

const thumbnailExt = "webp"

type (
	compressTask struct {
		source  string
		photoId uint64
	}

	Logic struct {
		queue chan compressTask
		pool  *ants.Pool
	}
)

func New() *Logic {
	pool, _ := ants.NewPool(100)
	l := &Logic{
		queue: make(chan compressTask, 32),
		pool:  pool,
	}
	go l.start()
	return l
}

func (l *Logic) Compress(photoId uint64, source string) {
	l.queue <- compressTask{
		source:  source,
		photoId: photoId,
	}
}

func (l *Logic) Release() {
	l.pool.Release()
}

func (l *Logic) start() {
	for task := range l.queue {
		err := l.pool.Submit(func() {
			if err := l.doCompress(task.photoId, task.source); err != nil {
				facades.Log().Errorf("failed to compress %s: %s", task.source, err)
			}
		})
		if err != nil {
			facades.Log().Errorf("failed to compress err: %s", err)
		}
	}
}

func (l *Logic) doCompress(photoId uint64, source string) error {
	var photo models.Photo
	if err := facades.Orm().Query().Where("`id` = ?", photoId).FindOrFail(&photo); err != nil {
		return err
	}

	content, err := facades.Storage().Get(source)
	if err != nil {
		return err
	}

	ips := vips.NewImportParams()
	ips.NumPages.Set(-1)
	img, err := vips.LoadImageFromBuffer([]byte(content), ips)
	if err != nil {
		return err
	}
	defer img.Close()

	params := vips.NewWebpExportParams()
	params.Quality = 50
	data, _, err := img.ExportWebp(params)
	if err != nil {
		return err
	}
	thumbnailPath := fmt.Sprintf("thumbnail/%s.%s", photo.Md5, thumbnailExt)
	if err = facades.Storage().Put(thumbnailPath, string(data)); err != nil {
		return err
	}

	_, err = facades.Orm().Query().Where("`id` = ?", photoId).Update(models.Photo{
		Thumbnail: thumbnailPath,
		Width:     img.Width(),
		Height:    img.Height(),
	})
	return err
}
