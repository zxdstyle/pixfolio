package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type CaptchaVerifyRequest struct {
	Type string `json:"type"`
	Data any    `json:"data"`
}

func (r *CaptchaVerifyRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *CaptchaVerifyRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"type": "required|in:slide,rotate,click",
		"data": "required|map",
	}
}

func (r *CaptchaVerifyRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *CaptchaVerifyRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *CaptchaVerifyRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
