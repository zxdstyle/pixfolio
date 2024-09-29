package providers

import (
	"github.com/goravel/framework/contracts/foundation"
	"github.com/goravel/framework/support/carbon"
)

type AppServiceProvider struct {
}

func (receiver *AppServiceProvider) Register(app foundation.Application) {

}

func (receiver *AppServiceProvider) Boot(app foundation.Application) {
	carbon.SetTimezone(app.MakeConfig().GetString("app.timezone", carbon.UTC))
}
