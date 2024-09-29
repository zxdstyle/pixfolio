package models

import "github.com/goravel/framework/database/orm"

type Album struct {
	orm.Model
	Name        string `json:"name"`
	Subtitle    string `json:"subtitle"`
	Description string `json:"description"`
	CoverId     uint64 `json:"cover_id"`

	Cover *Photo `json:"cover" gorm:"foreignKey:CoverId"`
}
