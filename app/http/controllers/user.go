package controllers

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
)

type UserController struct {
	//Dependent services
}

func NewUserController() *UserController {
	return &UserController{
		//Inject services
	}
}

func (r *UserController) Show(ctx http.Context) http.Response {

	if err := facades.Storage().Put("tets.txt", "test"); err != nil {
		return ctx.Response().String(http.StatusInternalServerError, err.Error())
	}

	return ctx.Response().Success().Json(http.Json{
		"Hello": "Goravel",
	})
}
