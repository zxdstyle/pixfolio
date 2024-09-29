package captcha

import (
	"github.com/golang-module/dongle"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support/json"
	"github.com/spf13/cast"
	"github.com/wenlng/go-captcha-assets/resources/images"
	"github.com/wenlng/go-captcha-assets/resources/tiles"
	"github.com/wenlng/go-captcha/v2/slide"
)

type slideCaptcha struct {
	captcha     slide.Captcha
	captchaType string
}

func newSlideCaptcha() Captcha {
	c := &slideCaptcha{
		captchaType: "slide",
	}
	c.doInit()
	return c
}

func (c *slideCaptcha) doInit() {
	builder := slide.NewBuilder(
		slide.WithEnableGraphVerticalRandom(true),
	)

	imgs, err := images.GetImages()
	if err != nil {
		facades.Log().Error(err)
		return
	}
	graphs, err := tiles.GetTiles()
	if err != nil {
		facades.Log().Error(err)
		return
	}

	var newGraphs = make([]*slide.GraphImage, 0, len(graphs))
	for i := 0; i < len(graphs); i++ {
		graph := graphs[i]
		newGraphs = append(newGraphs, &slide.GraphImage{
			OverlayImage: graph.OverlayImage,
			MaskImage:    graph.MaskImage,
			ShadowImage:  graph.ShadowImage,
		})
	}

	builder.SetResources(
		slide.WithGraphImages(newGraphs),
		slide.WithBackgrounds(imgs),
	)
	c.captcha = builder.Make()
}

func (c *slideCaptcha) Generate() (*Payload, error) {
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
			"image":       data.GetMasterImage().ToBase64(),
			"thumb":       data.GetTileImage().ToBase64(),
			"captKey":     key,
			"thumbX":      blockData.TileX,
			"thumbY":      blockData.TileY,
			"thumbWidth":  blockData.Width,
			"thumbHeight": blockData.Height,
		},
	}, nil
}

func (c *slideCaptcha) Verify(payload Payload) (bool, error) {
	ck := cacheKey(c.captchaType, payload.CaptchaKey)
	cached := facades.Cache().Get(ck)
	if cached == nil {
		return false, ErrInvalidCaptcha
	}

	var target map[string]any
	err := json.Unmarshal([]byte(cast.ToString(cached)), &target)
	if err != nil {
		return false, err
	}

	var (
		data = payload.Data.(map[string]any)

		x = cast.ToInt64(data["x"])
		y = cast.ToInt64(data["y"])

		tx = cast.ToInt64(target["x"])
		ty = cast.ToInt64(target["y"])

		pass = slide.CheckPoint(x, y, tx, ty, 4)
	)

	if pass {
		facades.Cache().Forget(ck)
	}

	return pass, nil
}
