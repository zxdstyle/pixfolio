package models

import "github.com/goravel/framework/database/orm"

type Setting struct {
	orm.Model
	Key   string
	Value string
}
