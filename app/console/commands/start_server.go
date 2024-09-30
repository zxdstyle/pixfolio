package commands

import (
	"context"
	"github.com/goravel/framework/contracts/console"
	"github.com/goravel/framework/contracts/console/command"
	"github.com/goravel/framework/facades"
	"github.com/zxdstyle/pixfolio/app/http/logic/compress"
	"github.com/zxdstyle/pixfolio/routes"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

type StartServer struct {
}

// Signature The name and signature of the console command.
func (receiver *StartServer) Signature() string {
	return "serve"
}

// Description The console command description.
func (receiver *StartServer) Description() string {
	return "Start http server"
}

// Extend The console command extend.
func (receiver *StartServer) Extend() command.Extend {
	return command.Extend{
		Category: "start",
	}
}

// Handle Execute the console command.
func (receiver *StartServer) Handle(ctx console.Context) error {
	routes.Web()
	routes.Api()

	srv := facades.Route()

	go func() {
		if err := srv.Run(); err != nil {
			log.Fatal(err)
		}
	}()

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)
	<-sc

	facades.Log().Infof("Releasing resources...")
	compress.Instance.Release()
	facades.Log().Infof("Released resources")

	facades.Log().Infof("Shutting down server...")

	c, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(c); err != nil {
		facades.Log().Errorf("Server forced to shutdown: %v", err)
	}
	facades.Log().Info("Server exited gracefully")
	return nil
}
