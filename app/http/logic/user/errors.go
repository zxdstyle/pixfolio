package user

import "github.com/zxdstyle/pixfolio/app/http/responses"

var (
	ErrRepeatedUsername     = responses.NewErr(10001, "repeated username")
	ErrRepeatedEmail        = responses.NewErr(10002, "repeated email")
	ErrInvalidPwdOrUsername = responses.NewErr(10003, "invalid password or username")

	ErrPasswordMismatch = responses.NewErr(10004, "password mismatch")
)
