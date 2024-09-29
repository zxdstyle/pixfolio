package middleware

import (
	"errors"
	"github.com/goravel/framework/auth"
	"github.com/goravel/framework/contracts/http"
	contractshttp "github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
)

func CheckAuth() contractshttp.Middleware {
	return func(ctx contractshttp.Context) {
		var (
			token = ctx.Request().Headers().Get("Authorization")
		)

		if len(token) == 0 {
			ctx.Request().AbortWithStatusJson(http.StatusUnauthorized, http.Json{
				"code":    http.StatusUnauthorized,
				"message": "Authorization header is empty",
			})
			return
		}

		payload, err := facades.Auth(ctx).Parse(token)
		if err != nil {
			facades.Log().Debug(payload)
			if errors.Is(err, auth.ErrorTokenExpired) {
				//token, err = facades.Auth(ctx).Refresh()
				//if err != nil {
				// Refresh time exceeded
				ctx.Request().AbortWithStatusJson(http.StatusUnauthorized, http.Json{
					"code":    http.StatusUnauthorized,
					"message": "Token expired",
				})
				return
				//}

				//token = "Bearer " + token
			} else {
				ctx.Request().AbortWithStatusJson(http.StatusUnauthorized, http.Json{
					"code":    http.StatusUnauthorized,
					"message": "Token invalid",
				})
				return
			}
		}

		ctx.Response().Header("Authorization", token)
		ctx.Request().Next()
	}
}
