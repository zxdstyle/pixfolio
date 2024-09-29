package base

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
)

type (
	PrimaryKeyConverter[K comparable] func(any) K

	OptionFunc[M any, K comparable] func(controller *Controller[M, K])

	BeforeStoreHook[M any] func(ctx http.Context, m M) (M, error)

	BeforeEditHook[M any, K comparable] func(ctx http.Context, id K, m M) (M, error)

	BeforeFindHook[M any] func(ctx http.Context, filters *[]base.Filter) error
)

func WithBeforeStore[M any, K comparable](hook BeforeStoreHook[M]) OptionFunc[M, K] {
	return func(c *Controller[M, K]) {
		c.beforeStore = hook
	}
}

func WithBeforeEdit[M any, K comparable](hook BeforeEditHook[M, K]) OptionFunc[M, K] {
	return func(c *Controller[M, K]) {
		c.beforeEdit = hook
	}
}

func WithBeforeFind[M any, K comparable](hook BeforeFindHook[M]) OptionFunc[M, K] {
	return func(c *Controller[M, K]) {
		c.beforeFind = hook
	}
}

func WithRouteKey[M any, K comparable](routeKey string) OptionFunc[M, K] {
	return func(c *Controller[M, K]) {
		c.routeKey = routeKey
	}
}

func WithScoped[M any, K comparable](filters ...base.FilterItem) OptionFunc[M, K] {
	return func(c *Controller[M, K]) {
		c.scoped = filters
	}
}
