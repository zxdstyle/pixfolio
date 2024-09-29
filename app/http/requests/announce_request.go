package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
	"github.com/zxdstyle/pixfolio/app/constants"
)

type AnnounceRequest struct {
	PeerId     string                  `json:"peer_id" form:"peer_id"`
	InfoHash   string                  `json:"info_hash" form:"info_hash"`
	Port       uint16                  `json:"port" form:"port"`
	Uploaded   uint64                  `json:"uploaded" form:"uploaded"`
	Downloaded uint64                  `json:"downloaded" form:"downloaded"`
	Left       uint64                  `json:"left" form:"left"`
	Event      constants.AnnounceEvent `json:"event" form:"event"`
	NumWant    uint64                  `json:"numwant" form:"numwant"`
	Ip         string                  `json:"ip" form:"ip"`
	Agent      string                  `json:"agent" form:"agent"`
	Passkey    string                  `json:"passkey" form:"passkey"`
}

func (r *AnnounceRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *AnnounceRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"info_hash":  "required|min_len:1",
		"peer_id":    "required",
		"port":       "required",
		"uploaded":   "required",
		"downloaded": "required",
		"left":       "required",
	}
}

func (r *AnnounceRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *AnnounceRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *AnnounceRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
