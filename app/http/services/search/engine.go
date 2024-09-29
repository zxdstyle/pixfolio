package search

import (
	"context"
	"github.com/meilisearch/meilisearch-go"
)

type Engine interface {
	Search() (*meilisearch.SearchResponse, error)
	Create(ctx context.Context, documents ...any) error
}
