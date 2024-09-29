package captcha

import (
	"errors"
	"fmt"
	"time"
)

type (
	Payload struct {
		Type       string `json:"type"`
		CaptchaKey string `json:"captcha_key"`
		Data       any    `json:"data"`
	}

	Captcha interface {
		Generate() (*Payload, error)
		Verify(payload Payload) (bool, error)
	}
)

// todo 自定义配置
const expire = 5 * time.Minute

var (
	ErrInvalidCaptcha = errors.New("invalid captcha")

	captcha = map[string]Captcha{
		"slide":  newSlideCaptcha(),
		"rotate": newRotateCaptcha(),
		"click":  newClickCaptcha(),
	}
)

func cacheKey(t, id string) string {
	return fmt.Sprintf("captcha:waitting:%s:%s", t, id)
}

func Generate() (*Payload, error) {
	// todo 自定义配置
	t := "slide"
	ct, ok := captcha[t]
	if !ok {
		return nil, errors.New("captcha not exist")
	}

	pl, err := ct.Generate()
	if err != nil {
		return nil, err
	}

	return pl, nil
}

func Verify(payload Payload) (bool, error) {
	ct, ok := captcha[payload.Type]
	if !ok {
		return false, ErrInvalidCaptcha
	}

	return ct.Verify(payload)
}
