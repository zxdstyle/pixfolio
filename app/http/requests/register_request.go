package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type RegisterRequest struct {
	Username        string `json:"username" form:"username"`
	Password        string `json:"password" form:"password"`
	PasswordConfirm string `json:"password_confirm" form:"password_confirm"`
	Email           string `json:"email" form:"email"`
	CaptchaCode     string `json:"captcha_code" form:"captcha_code"`
}

func (r *RegisterRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *RegisterRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"username":         "required|alpha_num",
		"password":         "required",
		"password_confirm": "required",
		"email":            "required|email",
		"captcha_code":     "required",
	}
}

func (r *RegisterRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *RegisterRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *RegisterRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
