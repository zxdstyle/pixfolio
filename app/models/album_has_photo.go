package models

import "github.com/goravel/framework/database/orm"

type AlbumHasPhoto struct {
	orm.Model
	AlbumId uint64 `json:"album_id" gorm:"uniqueIndex:uniq_album_photo"`
	PhotoId uint64 `json:"photo_id" gorm:"uniqueIndex:uniq_album_photo"`
}
