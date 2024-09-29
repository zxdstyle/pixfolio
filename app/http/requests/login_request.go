package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type LoginRequest struct {
	Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
	//CaptchaCode string `json:"captcha_code" form:"captcha_code"`
}

func (r *LoginRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *LoginRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"username": "required|alpha_num",
		"password": "required",
		//"captcha_code": "required",
	}
}

func (r *LoginRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *LoginRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *LoginRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
