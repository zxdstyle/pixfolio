package commands

import (
	"github.com/goravel/framework/contracts/console"
	"github.com/goravel/framework/contracts/console/command"
	"github.com/goravel/framework/database/gorm"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/str"
	"github.com/zxdstyle/pixfolio/app/models"
	"os"
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
	const installed = "storage/app/.installed"
	_, err := os.Stat(installed)
	if err == nil {
		return nil
	}

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

	err = facades.Orm().Query().Create(&models.User{
		Username: "admin",
		Password: hashPwd,
	})
	if err != nil {
		return err
	}

	if err := os.WriteFile(installed, []byte("installed"), os.ModePerm); err != nil {
		return err
	}

	ctx.Info("创建管理员账号成功!")
	ctx.Info("账号: admin")
	ctx.Info("密码: " + pwd)
	ctx.Info("初始化环境完成")
	ctx.Info("安装成功!")

	return nil
}
