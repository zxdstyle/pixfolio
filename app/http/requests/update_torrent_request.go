package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type UpdateTorrentRequest struct {
	Name            string `json:"name"`
	Filename        string `json:"filename"`
	Summary         string `json:"summary"`
	PersonalRelease *int   `json:"personal_release" form:"personal_release"`
	Size            int    `json:"size"`
	Info            struct {
		Description string `json:"description"`
		MediaInfo   string `json:"media_info"`
	} `json:"info"`
}

func (r *UpdateTorrentRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *UpdateTorrentRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"name":             "required|max_len:255",
		"summary":          "required",
		"info.description": "required",
	}
}

func (r *UpdateTorrentRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *UpdateTorrentRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *UpdateTorrentRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
