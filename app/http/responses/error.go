package responses

type CustomError struct {
	code int
	msg  string
}

func (e CustomError) Code() int {
	return e.code
}

func (e CustomError) Error() string {
	return e.msg
}

func NewErr(code int, msg string) error {
	return CustomError{code, msg}
}
