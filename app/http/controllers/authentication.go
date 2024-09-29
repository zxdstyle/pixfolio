package controllers

import (
	"fmt"
	"github.com/golang-module/dongle"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/carbon"
	"github.com/zxdstyle/pixfolio/app/http/logic/captcha"
	"github.com/zxdstyle/pixfolio/app/http/logic/user"
	"github.com/zxdstyle/pixfolio/app/http/requests"
	"github.com/zxdstyle/pixfolio/app/http/responses"
	"github.com/zxdstyle/pixfolio/app/models"
	"time"
)

type Authentication struct {
	user *user.User
}

func NewAuthentication() *Authentication {
	return &Authentication{
		user: user.New(),
	}
}

func (a *Authentication) Captcha(ctx http.Context) http.Response {
	resp, err := captcha.Generate()
	if err != nil {
		return ctx.Response().Json(http.StatusInternalServerError, http.Json{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
	}
	return ctx.Response().Success().Json(resp)
}

func (a *Authentication) VerifyCaptcha(ctx http.Context) http.Response {
	var req requests.CaptchaVerifyRequest
	v, err := ctx.Request().ValidateRequest(&req)
	if err != nil {
		return ctx.Response().Json(http.StatusBadRequest, http.Json{
			"code":    http.StatusBadRequest,
			"message": "invalid captcha",
		})
	}

	if v != nil {
		if errs := v.All(); len(errs) > 0 {
			return ctx.Response().Json(http.StatusUnprocessableEntity, http.Json{
				"code":    http.StatusBadRequest,
				"message": "invalid captcha",
			})
		}
	}

	captchaKey := ctx.Request().Route("key")
	verify, err := captcha.Verify(captcha.Payload{
		Type:       req.Type,
		CaptchaKey: captchaKey,
		Data:       req.Data,
	})
	if err != nil || !verify {
		return ctx.Response().Json(http.StatusInternalServerError, http.Json{
			"code":    http.StatusBadRequest,
			"message": "invalid captcha",
		})
	}

	pk := fmt.Sprintf("%s_%d_%s", captchaKey, carbon.Now().TimestampMilli(), req.Type)
	code := dongle.Encrypt.FromString(pk).ByMd5().ToHexString()
	if err := facades.Cache().Put(code, "1", 5*time.Minute); err != nil {
		return ctx.Response().Json(http.StatusInternalServerError, http.Json{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
	}
	return ctx.Response().Json(http.StatusOK, http.Json{
		"captcha_code": code,
	})
}

func (a *Authentication) Register(ctx http.Context) http.Response {
	var req requests.RegisterRequest
	v, err := ctx.Request().ValidateRequest(&req)
	if err != nil {
		return responses.Error(ctx, err)
	}
	if v != nil {
		return responses.Failed(ctx, v.One(), http.StatusBadRequest)
	}

	if req.PasswordConfirm != req.Password {
		return responses.Failed(ctx, "passwords do not match", http.StatusBadRequest)
	}

	val := facades.Cache().Get(req.CaptchaCode)
	if val != "1" {
		return responses.Failed(ctx, "captcha code is invalid", http.StatusBadRequest)
	}

	u, err := a.user.Register(ctx, req)
	if err != nil {
		return responses.Error(ctx, err)
	}

	token, err := facades.Auth(ctx).Login(u)
	if err != nil {
		return responses.Error(ctx, err)
	}

	return ctx.Response().Success().Json(map[string]any{
		"token": token,
	})
}

func (a *Authentication) Login(ctx http.Context) http.Response {
	var req requests.LoginRequest
	v, err := ctx.Request().ValidateRequest(&req)
	if err != nil {
		return responses.Error(ctx, err)
	}
	if v != nil {
		return responses.Failed(ctx, v.One(), http.StatusBadRequest)
	}

	//val := facades.Cache().Get(req.CaptchaCode)
	//if val != "1" {
	//	return responses.Failed(ctx, "captcha code is invalid", http.StatusBadRequest)
	//}

	token, err := a.user.Login(ctx, req)
	if err != nil {
		return responses.Error(ctx, err)
	}

	return ctx.Response().Success().Json(map[string]any{
		"token": token,
	})
}

func (a *Authentication) ChangePassword(ctx http.Context) http.Response {
	var req requests.ChangePasswordRequest
	v, err := ctx.Request().ValidateRequest(&req)
	if err != nil {
		return responses.Error(ctx, err)
	}
	if v != nil {
		return responses.Failed(ctx, v.One(), http.StatusBadRequest)
	}

	if err := a.user.ChangePassword(ctx, req); err != nil {
		return responses.Error(ctx, err)
	}
	return responses.Success(ctx, nil)
}

func (a *Authentication) Userinfo(ctx http.Context) http.Response {
	var u models.User
	if err := facades.Auth(ctx).User(&u); err != nil {
		return responses.Error(ctx, err)
	}
	info, err := a.user.UserInfo(ctx)
	if err != nil {
		return responses.Error(ctx, err)
	}

	var photoCount int64
	_ = facades.Orm().WithContext(ctx).Query().Model(models.Photo{}).Count(&photoCount)

	var albumCount int64
	_ = facades.Orm().WithContext(ctx).Query().Model(models.Album{}).Count(&albumCount)

	info.AlbumCount = albumCount
	info.PhotoCount = photoCount

	return ctx.Response().Success().Json(info)
}

//func (a *Authentication) SendVerificationEmail(ctx http.Context) http.Response {
//	ck := ctx.Request().Input("captcha_code")
//	val := facades.Cache().Get(ck)
//	if val != "1" {
//		return responses.Failed(ctx, "captcha code is invalid", http.StatusBadRequest)
//	}
//
//	var u models.User
//	if err := facades.Auth(ctx).User(&u); err != nil {
//		return responses.Error(ctx, err)
//	}
//
//	if err := a.email.SendEmailConfirm(ctx, &u); err != nil {
//		return responses.Error(ctx, err)
//	}
//
//	return responses.Success(ctx, nil)
//}
//
//func (a *Authentication) VerifyConfirmEmail(ctx http.Context) http.Response {
//	token := ctx.Request().Query("token")
//
//	var u models.User
//	if err := facades.Auth(ctx).User(&u); err != nil {
//		return responses.Error(ctx, err)
//	}
//
//	if err := a.email.VerifyConfirmCode(ctx, &u, token); err != nil {
//		return responses.Error(ctx, err)
//	}
//	return responses.Success(ctx, nil)
//}
