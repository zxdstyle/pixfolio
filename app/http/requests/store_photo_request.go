package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type StorePhotoRequest struct {
	Username        string `json:"username" form:"username"`
	Password        string `json:"password" form:"password"`
	PasswordConfirm string `json:"password_confirm" form:"password_confirm"`
	Email           string `json:"email" form:"email"`
	CaptchaCode     string `json:"captcha_code" form:"captcha_code"`
}

func (r *StorePhotoRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *StorePhotoRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"username":         "required|alpha_num",
		"password":         "required",
		"password_confirm": "required",
		"email":            "required|email",
		"captcha_code":     "required",
	}
}

func (r *StorePhotoRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StorePhotoRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StorePhotoRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
