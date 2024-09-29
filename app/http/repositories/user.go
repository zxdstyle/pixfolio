package repositories

import (
	"context"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/models"
)

type User struct {
	*base.Crud[models.User, uint64]
}

func NewUser() *User {
	return &User{
		Crud: base.NewCrud[models.User, uint64](),
	}
}

func (*User) GetUserByPasskey(ctx context.Context, passkey string) (*models.User, error) {
	var (
		user models.User
		err  = facades.Orm().WithContext(ctx).Query().Where("passkey = ?", passkey).Find(&user)
	)
	return &user, err
}
