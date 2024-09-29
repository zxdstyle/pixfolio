package requests

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/contracts/validation"
)

type StoreCategoryRequest struct {
	Name      string `json:"name"`
	SortIndex int    `json:"sort_index"`
	Icon      string `json:"icon"`
}

func (r *StoreCategoryRequest) Authorize(ctx http.Context) error {
	return nil
}

func (r *StoreCategoryRequest) Rules(ctx http.Context) map[string]string {
	return map[string]string{
		"name": "required|max_len:255",
	}
}

func (r *StoreCategoryRequest) Messages(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StoreCategoryRequest) Attributes(ctx http.Context) map[string]string {
	return map[string]string{}
}

func (r *StoreCategoryRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
	return nil
}
