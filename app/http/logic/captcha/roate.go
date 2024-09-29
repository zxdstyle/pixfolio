package captcha

import (
	"github.com/golang-module/dongle"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/json"
	"github.com/spf13/cast"
	"github.com/wenlng/go-captcha-assets/resources/images"
	"github.com/wenlng/go-captcha/v2/base/option"
	"github.com/wenlng/go-captcha/v2/rotate"
	"log"
)

type rotateCaptcha struct {
	captchaType string
	captcha     rotate.Captcha
}

func newRotateCaptcha() Captcha {
	c := &rotateCaptcha{
		captchaType: "rotate",
	}
	c.doInit()
	return c
}

func (c *rotateCaptcha) doInit() {
	builder := rotate.NewBuilder(rotate.WithRangeAnglePos([]option.RangeVal{
		{Min: 20, Max: 330},
	}))

	// background images
	imgs, err := images.GetImages()
	if err != nil {
		log.Fatalln(err)
	}

	// set resources
	builder.SetResources(
		rotate.WithImages(imgs),
	)

	c.captcha = builder.Make()
}

func (c *rotateCaptcha) Generate() (*Payload, error) {
	data, err := c.captcha.Generate()
	if err != nil {
		return nil, err
	}

	blockData := data.GetData()
	bt, err := json.Marshal(blockData)
	if err != nil {
		return nil, err
	}
	key := dongle.Encrypt.FromBytes(bt).ByMd5().ToHexString()

	ck := cacheKey(c.captchaType, key)
	cached, err := json.Marshal(blockData)
	if err != nil {
		return nil, err
	}
	if err := facades.Cache().Put(ck, cached, expire); err != nil {
		return nil, err
	}

	return &Payload{
		Type:       c.captchaType,
		CaptchaKey: key,
		Data: map[string]any{
			"image": data.GetMasterImage().ToBase64(),
			"thumb": data.GetThumbImage().ToBase64(),
		},
	}, nil
}

func (c *rotateCaptcha) Verify(payload Payload) (bool, error) {
	ck := cacheKey(c.captchaType, payload.CaptchaKey)
	cached := facades.Cache().Get(ck)
	if cached == nil {
		facades.Log().Errorf("failed to fetch cached captcha, key:%s", payload.CaptchaKey)
		return false, ErrInvalidCaptcha
	}

	var target map[string]any
	err := json.Unmarshal([]byte(cast.ToString(cached)), &target)
	if err != nil {
		facades.Log().Errorf("failed to unmarshal cached captcha, err: %s", err.Error())
		return false, err
	}

	var (
		data = payload.Data.(map[string]any)

		angle = cast.ToInt64(data["angle"])

		tAngle = cast.ToInt64(target["angle"])

		pass = rotate.CheckAngle(angle, tAngle, 4)
	)

	if pass {
		facades.Cache().Forget(ck)
	}

	return pass, nil
}
