package tests

import (
	"github.com/goravel/framework/testing"

	"github.com/zxdstyle/pixfolio/bootstrap"
)

func init() {
	bootstrap.Boot()
}

type TestCase struct {
	testing.TestCase
}
