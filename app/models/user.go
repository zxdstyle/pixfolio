package models

import (
	"github.com/goravel/framework/database/orm"
)

type User struct {
	orm.Model
	Username string `gorm:"column:username;unique" json:"username"`
	Password string `gorm:"column:password" json:"-"`

	AlbumCount int64 `json:"album_count" gorm:"-"`
	PhotoCount int64 `json:"photo_count" gorm:"-"`
}
