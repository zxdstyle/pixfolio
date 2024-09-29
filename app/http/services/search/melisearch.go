package search

import (
	"context"
	"fmt"
	"github.com/meilisearch/meilisearch-go"
)

type MeiliSearch struct {
	client meilisearch.ServiceManager
}

func NewMeiliSearch() *MeiliSearch {
	return &MeiliSearch{
		client: meilisearch.New(
			"http://192.168.5.7:7700",
			meilisearch.WithAPIKey("HmPEKZhcoANzRt3DTPhRQVRxPEVZw7m2TymKwKhs_pca52J"),
		),
	}
}

func (m *MeiliSearch) Search() (*meilisearch.SearchResponse, error) {
	return m.client.Index("torrents").Search("", &meilisearch.SearchRequest{})
}

func (m *MeiliSearch) Create(ctx context.Context, documents ...any) error {
	res, err := m.client.Index("torrents").AddDocumentsWithContext(ctx, documents)
	fmt.Println(res)
	return err
}
