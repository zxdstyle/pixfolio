package main

import (
	"github.com/davidbyttow/govips/v2/vips"
	"github.com/zxdstyle/pixfolio/bootstrap"
	"runtime"
)

func main() {
	vips.LoggingSettings(nil, vips.LogLevelError)
	vips.Startup(&vips.Config{
		ConcurrencyLevel: runtime.NumCPU(),
		MaxCacheFiles:    0,
		MaxCacheMem:      0,
		MaxCacheSize:     0,
		ReportLeaks:      true,
		CacheTrace:       false,
		CollectStats:     false,
	})
	defer vips.Shutdown()

	// This bootstraps the framework and gets it ready for use.
	bootstrap.Boot()
}
