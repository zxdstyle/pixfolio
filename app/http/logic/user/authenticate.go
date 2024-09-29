package user

import (
	"context"
	"errors"
	"github.com/golang-module/dongle"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/requests"
	"github.com/zxdstyle/pixfolio/app/models"
	"github.com/zxdstyle/pixfolio/app/utils"
)

func (u *User) Register(ctx http.Context, req requests.RegisterRequest) (*models.User, error) {
	if err := u.check(ctx, req); err != nil {
		return nil, err
	}

	pwd, err := facades.Hash().Make(req.Password)
	if err != nil {
		return nil, err
	}

	var (
		user = models.User{
			Username: req.Username,
			Password: pwd,
		}
	)
	err = facades.Orm().WithContext(ctx).Query().Create(&user)
	return &user, err
}

func (u *User) check(ctx http.Context, req requests.RegisterRequest) error {
	var user models.User
	err := facades.Orm().WithContext(ctx).Query().Where("`username` = ? OR `email` = ?", req.Username, req.Email).Find(&user)
	if err != nil {
		return err
	}
	if user.Username == req.Username {
		return ErrRepeatedUsername
	}
	return nil
}

func (u *User) generateKey(ctx context.Context, field string) (string, error) {
	var (
		retries int
	)
	for {
		var (
			exists bool
			key    = dongle.Encrypt.FromString(utils.RandomStr(32)).ByMd5().ToHexString()
		)
		if err := facades.Orm().WithContext(ctx).Query().Model(models.User{}).Where(field, key).Exists(&exists); err != nil {
			return "", err
		}
		if !exists {
			return key, nil
		}
		if retries > 5 {
			return "", errors.New("failed to generate passkey")
		}
		retries++
	}
}

func (u *User) Login(ctx http.Context, req requests.LoginRequest) (string, error) {
	var user models.User
	if err := facades.Orm().WithContext(ctx).Query().Where("`username` = ?", req.Username).Find(&user); err != nil {
		return "", err
	}

	if !facades.Hash().Check(req.Password, user.Password) {
		return "", ErrInvalidPwdOrUsername
	}

	//go func() {
	//	if _, err := facades.Orm().WithContext(ctx).Query().Model(models.User{}).
	//		Where("`id` = ?", user.ID).
	//		Update("`last_login_at`", carbon.Now()); err != nil {
	//		facades.Log().Errorf("failed to update last_login_at: %s", err.Error())
	//	}
	//}()

	return facades.Auth(ctx).Login(user)
}

func (u *User) UserInfo(ctx http.Context) (*models.User, error) {
	var user models.User
	if err := facades.Auth(ctx).User(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *User) ChangePassword(ctx http.Context, req requests.ChangePasswordRequest) error {
	if req.NewPassword != req.PasswordConfirm {
		return ErrPasswordMismatch
	}
	var user models.User
	if err := facades.Auth(ctx).User(&user); err != nil {
		return err
	}

	if !facades.Hash().Check(req.OriginPassword, user.Password) {
		return ErrPasswordMismatch
	}

	pwd, err := facades.Hash().Make(req.NewPassword)
	if err != nil {
		return err
	}

	_, err = facades.Orm().WithContext(ctx).Query().Model(models.User{}).Where("`id`", user.ID).Update("`password`", pwd)
	return err
}
