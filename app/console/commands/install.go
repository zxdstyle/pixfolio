package commands

import (
	"errors"
	"github.com/goravel/framework/contracts/console"
	"github.com/goravel/framework/contracts/console/command"
	"github.com/goravel/framework/database/gorm"
	"github.com/goravel/framework/database/orm"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/str"
	"github.com/zxdstyle/pixfolio/app/models"
)

type Install struct {
}

// Signature The name and signature of the console command.
func (receiver *Install) Signature() string {
	return "install"
}

// Description The console command description.
func (receiver *Install) Description() string {
	return "Start announce server"
}

// Extend The console command extend.
func (receiver *Install) Extend() command.Extend {
	return command.Extend{}
}

// Handle Execute the console command.
func (receiver *Install) Handle(ctx console.Context) error {
	ctx.Info("初始化环境...")

	facades.Artisan().Call("key:generate")
	facades.Artisan().Call("jwt:secret")

	if err := facades.Orm().Query().(*gorm.QueryImpl).Instance().AutoMigrate(
		&models.User{},
		&models.Photo{},
		&models.Album{},
		&models.Setting{},
		&models.AlbumHasPhoto{},
	); err != nil {
		return err
	}

	pwd := str.Random(8)
	hashPwd, err := facades.Hash().Make(pwd)
	if err != nil {
		return err
	}

	err = facades.Orm().Query().Where("`id` = ?", 1).FirstOrCreate(&models.Album{}, &models.Album{
		Name:        "首页",
		Subtitle:    "Home",
		Description: "首页轮播背景图（无法删除）",
	})
	if err != nil {
		return err
	}

	var user models.User
	err = facades.Orm().Query().Where("`username` = ?", "admin").First(&user)
	if err != nil && !errors.Is(err, orm.ErrRecordNotFound) {
		return err
	}
	result := "ok"
	if user.ID > 0 {
		result, err = ctx.Choice("管理员账号已存在，是否重新创建？", []console.Choice{
			{Key: "保留原账号", Selected: true, Value: "ok"},
			{Key: "重新创建管理员账号", Selected: false, Value: "delete"},
		})
		if err != nil {
			return err
		}
	}

	if result == "delete" {
		_, err := facades.Orm().Query().Where("`username` = ?", "admin").Delete(&models.User{})
		if err != nil {
			return err
		}
		ctx.Info("已删除原管理员账号!")
	}

	if user.ID == 0 || result == "delete" {
		err = facades.Orm().Query().Create(&models.User{
			Username: "admin",
			Password: hashPwd,
		})
		if err != nil {
			return err
		}
		ctx.Info("创建管理员账号成功!")
		ctx.Info("账号: admin")
		ctx.Info("密码: " + pwd)
	}
	ctx.Info("初始化环境完成")
	ctx.Info("安装成功!")

	return nil
}
