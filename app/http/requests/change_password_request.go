package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type ChangePasswordRequest struct {
	OriginPassword  string `json:"origin_password" form:"origin_password"`
	NewPassword     string `json:"new_password" form:"new_password"`
	PasswordConfirm string `json:"password_confirm" form:"password_confirm"`
}

func (r *ChangePasswordRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *ChangePasswordRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"origin_password":  "required",
		"new_password":     "required",
		"password_confirm": "required",
	}
}

func (r *ChangePasswordRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *ChangePasswordRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *ChangePasswordRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
