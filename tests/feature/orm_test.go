package feature

import (
	"fmt"
	"github.com/zxdstyle/pixfolio/app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"testing"
)

func TestName(t *testing.T) {
	db, err := gorm.Open(mysql.Open("root:a8968640ZHU.@tcp(127.0.0.1:3306)/privtorr?charset=utf8mb4&parseTime=True&loc=Local"))
	if err != nil {
		t.Fatal(err)
	}
	db = db.Debug()
	var torrent []models.Torrent

	if err := db.Preload("Info").Find(&torrent).Error; err != nil {
		t.Fatal(err)
	}

	fmt.Println(torrent)
}
