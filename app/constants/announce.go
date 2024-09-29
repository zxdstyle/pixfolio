package constants

const (
	AnnounceIntervalMin = 1800
	AnnounceIntervalMAX = 3600
)

type AnnounceEvent string

const (
	AnnounceEventStarted   AnnounceEvent = "started"
	AnnounceEventCompleted AnnounceEvent = "completed"
	AnnounceEventStopped   AnnounceEvent = "stopped"
)
