package models

import (
	"github.com/goravel/framework/database/orm"
	"github.com/goravel/framework/facades"
	"gorm.io/gorm"
	"time"
)

type Photo struct {
	orm.Model
	Md5          string `json:"md5" gorm:"unique"` // md5
	OriginalName string `json:"original_name"`     // 源文件名
	Filename     string `json:"filename"`          // 保存后的文件名
	Url          string `json:"url" gorm:"-"`      // 文件完整可访问的URL
	Ext          string `json:"ext"`               // 后缀
	Size         int64  `json:"size"`              // 大小
	Width        int    `json:"width"`
	Height       int    `json:"height"`
	Thumbnail    string `json:"thumbnail"`              // 缩略图路径
	ThumbnailUrl string `json:"thumbnail_url" gorm:"-"` // 缩略图完整可访问的URL
}

const tempUrlDuration = time.Hour

func (p *Photo) AfterFind(tx *gorm.DB) error {
	deadline := time.Now().Add(tempUrlDuration)
	url, err := facades.Storage().TemporaryUrl(p.Filename, deadline)
	if err != nil {
		return err
	}
	p.Url = url

	if len(p.Thumbnail) > 0 {
		thumbnail, err := facades.Storage().TemporaryUrl(p.Thumbnail, deadline)
		if err != nil {
			return err
		}
		p.ThumbnailUrl = thumbnail
	} else {
		p.ThumbnailUrl = url
	}
	return nil
}
