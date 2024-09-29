package commands

import (
	"github.com/goravel/framework/contracts/console"
	"github.com/goravel/framework/contracts/console/command"
	"github.com/goravel/framework/facades"
)

type StartWorker struct {
}

// Signature The name and signature of the console command.
func (receiver *StartWorker) Signature() string {
	return "start:worker"
}

// Description The console command description.
func (receiver *StartWorker) Description() string {
	return "Start job worker"
}

// Extend The console command extend.
func (receiver *StartWorker) Extend() command.Extend {
	return command.Extend{
		Category: "worker",
	}
}

// Handle Execute the console command.
func (receiver *StartWorker) Handle(ctx console.Context) error {
	return facades.Queue().Worker(nil).Run()
}
