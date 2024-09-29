package routes

import (
	"github.com/goravel/framework/contracts/route"
	"github.com/goravel/framework/facades"
	ctrls "github.com/zxdstyle/pixfolio/app/http/controllers"
	"github.com/zxdstyle/pixfolio/app/http/middleware"
)

func Api() {
	facades.Route().Prefix("api").Prefix("v1").Group(func(router route.Router) {

		auth := ctrls.NewAuthentication()
		router.Post("login", auth.Login)
		router.Post("register", auth.Register)
		//router.Post("captcha", auth.Captcha)
		//router.Put("captcha/{key}", auth.VerifyCaptcha)

		photo := ctrls.NewPhoto()
		router.Get("photos", photo.Index)
		router.Get("photos/{id}", photo.Show)

		album := ctrls.NewAlbum()
		router.Get("albums", album.Index)
		router.Get("albums/{id}", album.Show)

		ahp := ctrls.NewAlbumHasPhoto()
		router.Get("album-has-photos", ahp.Index)
		router.Get("album-has-photos/{id}", ahp.Show)

		router.Prefix("albums/{id}").Group(func(r route.Router) {
			ap := ctrls.NewAlbumPhoto()
			r.Get("photos", ap.Index)
			r.Get("photos/{photo_id}", ap.Show)
		})

		router.Middleware(middleware.CheckAuth()).Group(func(a route.Router) {
			// Get logged-in user information
			a.Get("userinfo", auth.Userinfo)
			// Verify the confirmation token
			//a.Get("verify-confirm-token", auth.VerifyConfirmEmail)
			// Send confirmation token email
			//a.Post("send-verification-email", auth.SendVerificationEmail)
			// 修改密码
			a.Post("change-pwd", auth.ChangePassword)

			a.Post("photos", photo.Store)
			a.Put("photos/{id}", photo.Update)
			a.Delete("photos/{id}", photo.Destroy)

			a.Post("albums", album.Store)
			a.Put("albums/{id}", album.Update)
			a.Delete("albums/{id}", album.Destroy)

			a.Post("album-has-photos", ahp.Store)
			a.Put("album-has-photos/{id}", ahp.Update)
			a.Delete("album-has-photos/{id}", ahp.Destroy)
		})
	})
}
