package captcha

import (
	"github.com/golang-module/dongle"
	"github.com/golang/freetype/truetype"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/json"
	"github.com/spf13/cast"
	"github.com/wenlng/go-captcha-assets/bindata/chars"
	"github.com/wenlng/go-captcha-assets/resources/fonts/fzshengsksjw"
	"github.com/wenlng/go-captcha-assets/resources/images"
	"github.com/wenlng/go-captcha/v2/base/option"
	"github.com/wenlng/go-captcha/v2/click"
	"log"
)

type clickCaptcha struct {
	captcha     click.Captcha
	captchaType string
}

func newClickCaptcha() Captcha {
	c := &clickCaptcha{
		captchaType: "click",
	}
	c.doInit()
	return c
}

func (c *clickCaptcha) doInit() {
	builder := click.NewBuilder(
		click.WithRangeLen(option.RangeVal{Min: 4, Max: 6}),
		click.WithRangeVerifyLen(option.RangeVal{Min: 2, Max: 4}),
		click.WithRangeThumbColors([]string{
			"#1f55c4",
			"#780592",
			"#2f6b00",
			"#910000",
			"#864401",
			"#675901",
			"#016e5c",
		}),
		click.WithRangeColors([]string{
			"#fde98e",
			"#60c1ff",
			"#fcb08e",
			"#fb88ff",
			"#b4fed4",
			"#cbfaa9",
			"#78d6f8",
		}),
	)

	// fonts
	fonts, err := fzshengsksjw.GetFont()
	if err != nil {
		log.Fatalln(err)
	}

	// background images
	imgs, err := images.GetImages()
	if err != nil {
		log.Fatalln(err)
	}

	// thumb images
	//thumbImages, err := thumbs.GetThumbs()
	//if err != nil {
	//	log.Fatalln(err)
	//}

	// set resources
	builder.SetResources(
		click.WithChars(chars.GetChineseChars()),
		//click.WithChars([]string{
		//	"1A",
		//	"5E",
		//	"3d",
		//	"0p",
		//	"78",
		//	"DL",
		//	"CB",
		//	"9M",
		//}),
		//click.WithChars(chars.GetAlphaChars()),
		click.WithFonts([]*truetype.Font{fonts}),
		click.WithBackgrounds(imgs),
		//click.WithThumbBackgrounds(thumbImages),
	)

	c.captcha = builder.Make()
}

func (c *clickCaptcha) Generate() (*Payload, error) {
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
			"captKey": key,
			"image":   data.GetMasterImage().ToBase64(),
			"thumb":   data.GetThumbImage().ToBase64(),
		},
	}, nil
}

func (c *clickCaptcha) Verify(payload Payload) (bool, error) {
	ck := cacheKey(c.captchaType, payload.CaptchaKey)
	cached := facades.Cache().Get(ck)
	if cached == nil {
		facades.Log().Errorf("failed to fetch cached %s captcha, key:%s", c.captchaType, payload.CaptchaKey)
		return false, ErrInvalidCaptcha
	}

	var target map[int]*click.Dot
	err := json.Unmarshal([]byte(cast.ToString(cached)), &target)
	if err != nil {
		facades.Log().Errorf("failed to unmarshal cached %s captcha, err: %s", c.captcha, err.Error())
		return false, err
	}

	data := payload.Data.(map[string]any)
	if len(target) != len(data) {
		return false, nil
	}

	for _, dot := range target {
		var (
			idx = cast.ToString(dot.Index + 1)

			actual = cast.ToStringMap(data[idx])
			sx     = cast.ToInt64(actual["x"])
			sy     = cast.ToInt64(actual["y"])
		)
		if !click.CheckPoint(sx, sy, int64(dot.X), int64(dot.Y), int64(dot.Width), int64(dot.Height), 0) {
			return false, nil
		}
	}

	facades.Cache().Forget(ck)

	return true, nil
}
