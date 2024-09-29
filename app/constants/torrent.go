package constants

type TorrentStatus int

const (
	TorrentStatusPending   TorrentStatus = 0
	TorrentStatusApproved  TorrentStatus = 1
	TorrentStatusRejected  TorrentStatus = 2
	TorrentStatusPostponed TorrentStatus = 2
)
