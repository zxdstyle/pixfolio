package jobs

import "fmt"

type SendEmail struct {
}

// Signature The name and signature of the job.
func (receiver *SendEmail) Signature() string {
	return "send_email"
}

// Handle Execute the job.
func (receiver *SendEmail) Handle(args ...any) error {
	fmt.Println(args)
	return nil
}
