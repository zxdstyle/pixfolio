package bootstrap

import (
	_ "github.com/zxdstyle/pixfolio/bootstrap/setup"

	"github.com/goravel/framework/foundation"

	"github.com/zxdstyle/pixfolio/config"
)

func Boot() {
	app := foundation.NewApplication()

	//Bootstrap the application
	app.Boot()

	//Bootstrap the config.
	config.Boot()
}
