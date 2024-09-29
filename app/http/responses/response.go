package responses

import (
	"errors"
	"github.com/goravel/framework/contracts/http"
)

type ApiResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func Error(ctx http.Context, err error) http.Response {
	var (
		status = http.StatusInternalServerError
		msg    = err.Error()
		code   = status
	)

	var ce CustomError
	if errors.As(err, &ce) {
		code = ce.Code()
		status = http.StatusBadRequest
	}

	return ctx.Response().Json(status, ApiResponse{
		Code:    code,
		Message: msg,
	})
}

func Failed(ctx http.Context, msg string, code int) http.Response {
	return ctx.Response().Json(code, ApiResponse{
		Code:    code,
		Message: msg,
	})
}

func Success(ctx http.Context, data any) http.Response {
	return ctx.Response().Json(http.StatusOK, ApiResponse{
		Code:    http.StatusOK,
		Message: http.StatusText(http.StatusOK),
		Data:    data,
	})
}
