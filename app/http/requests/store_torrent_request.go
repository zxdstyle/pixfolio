package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type StoreTorrentRequest struct {
	Name      string `json:"name"`
	SortIndex int    `json:"sort_index"`
	Icon      string `json:"icon"`
}

func (r *StoreTorrentRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *StoreTorrentRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"name": "required|max_len:255",
	}
}

func (r *StoreTorrentRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StoreTorrentRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StoreTorrentRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
