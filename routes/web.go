package routes

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	"github.com/goravel/framework/support"
	"github.com/zxdstyle/pixfolio/public"
	"io/fs"
	stdHttp "net/http"
	"regexp"
)

func Web() {
	facades.Route().Fallback(func(ctx http.Context) http.Response {
		file, err := public.StaticFs.ReadFile("static/index.html")
		if err != nil {
			return ctx.Response().String(http.StatusInternalServerError, err.Error())
		}
		scriptRegexp := regexp.MustCompile(`<script type="module" crossorigin src="([^"]*)"></script>`)
		scriptData := scriptRegexp.FindAllStringSubmatch(string(file), -1)

		var (
			script []string
			css    []string
		)
		for _, s := range scriptData {
			if len(s) == 2 {
				script = append(script, s[1])
			}
		}

		cssRegexp := regexp.MustCompile(`<link rel="stylesheet" crossorigin href="(.*)">`)
		cssListData := cssRegexp.FindAllStringSubmatch(string(file), -1)
		for _, s := range cssListData {
			if len(s) == 2 {
				css = append(css, s[1])
			}
		}

		return ctx.Response().View().Make("index.tmpl", map[string]any{
			"version":    support.Version,
			"scriptPath": script,
			"cssPath":    css,
		})
	})

	staticFs, err := fs.Sub(public.StaticFs, "static")
	if err != nil {
		panic(err)
	}

	facades.Route().StaticFS("static", stdHttp.FS(staticFs))

	facades.Route().Static("storage", "./storage/app")
}
