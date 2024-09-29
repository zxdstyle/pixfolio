package base

import (
	"context"
	"github.com/goravel/framework/contracts/http"
	"github.com/spf13/cast"
	"github.com/zxdstyle/pixfolio/app/http/repositories/base"
	"github.com/zxdstyle/pixfolio/app/http/responses"
	"reflect"
	"strings"
)

type (
	CrudRepository[M any, K comparable] interface {
		List(ctx http.Context, filters []base.Filter) ([]*M, error)
		Show(ctx http.Context, id K, m *M) error
		Store(ctx context.Context, m *M) error
		Edit(ctx http.Context, id K, m *M) error
		Delete(ctx context.Context, id K) error
	}

	Controller[M any, K comparable] struct {
		Repo      CrudRepository[M, K]
		converter PrimaryKeyConverter[K]
		columns   map[string]base.ColumnMeta
		scoped    []base.FilterItem

		// hooks
		beforeStore BeforeStoreHook[M]
		beforeEdit  BeforeEditHook[M, K]
		beforeFind  BeforeFindHook[M]

		routeKey string
	}
)

func NewBaseController[M any, K comparable](repo CrudRepository[M, K], converter PrimaryKeyConverter[K], options ...OptionFunc[M, K]) *Controller[M, K] {
	c := &Controller[M, K]{
		Repo:      repo,
		converter: converter,
		routeKey:  "id",
		scoped:    make([]base.FilterItem, 0),
	}

	for _, option := range options {
		option(c)
	}

	c.fetchColumnMeta()
	return c
}

func (r *Controller[M, K]) Index(ctx http.Context) http.Response {
	filters, err := base.BuildFilter(ctx, r.columns)
	if err != nil {
		return responses.Error(ctx, err)
	}

	if r.beforeFind != nil {
		if err := r.beforeFind(ctx, &filters); err != nil {
			return responses.Error(ctx, err)
		}
	}

	data, err := r.Repo.List(ctx, filters)
	if err != nil {
		return ctx.Response().Json(http.StatusInternalServerError, http.Json{
			"message": err.Error(),
		})
	}

	return ctx.Response().Success().Json(data)
}

func (r *Controller[M, K]) Show(ctx http.Context) http.Response {
	var (
		id = cast.ToUint(ctx.Request().RouteInt(r.routeKey))
		mo M
	)

	if err := r.Repo.Show(ctx, r.converter(id), &mo); err != nil {
		return ctx.Response().String(http.StatusInternalServerError, err.Error())
	}
	return ctx.Response().Success().Json(mo)
}

func (r *Controller[M, K]) Store(ctx http.Context) http.Response {
	var (
		m   M
		err error
	)
	if err = ctx.Request().Bind(&m); err != nil {
		return responses.Error(ctx, err)
	}

	if r.beforeStore != nil {
		m, err = r.beforeStore(ctx, m)
		if err != nil {
			return responses.Error(ctx, err)
		}
	}

	if err = r.Repo.Store(ctx, &m); err != nil {
		return responses.Error(ctx, err)
	}

	return responses.Success(ctx, m)
}

func (r *Controller[M, K]) Update(ctx http.Context) http.Response {
	var (
		m   M
		err error
	)
	if err = ctx.Request().Bind(&m); err != nil {
		return responses.Error(ctx, err)
	}

	id := r.converter(ctx.Request().Route(r.routeKey))

	if r.beforeEdit != nil {
		m, err = r.beforeEdit(ctx, id, m)
		if err != nil {
			return responses.Error(ctx, err)
		}
	}

	if err = r.Repo.Edit(ctx, id, &m); err != nil {
		return responses.Error(ctx, err)
	}

	return responses.Success(ctx, m)
}

func (r *Controller[M, K]) Destroy(ctx http.Context) http.Response {
	id := ctx.Request().Route(r.routeKey)

	if err := r.Repo.Delete(ctx, r.converter(id)); err != nil {
		return responses.Error(ctx, err)
	}
	return ctx.Response().String(http.StatusNoContent, "")
}

func (r *Controller[M, K]) fetchColumnMeta() {
	var m M
	t := reflect.TypeOf(m)
	if t.Kind() != reflect.Struct {
		return
	}

	var (
		num     = t.NumField()
		columns = make(map[string]base.ColumnMeta)
	)
	for i := 0; i < num; i++ {
		var (
			field     = t.Field(i)
			name      = field.Tag.Get("json")
			filterStr = field.Tag.Get("filters")
			elements  = strings.Split(filterStr, ",")

			filters = make(map[string]struct{})
		)

		for _, filter := range elements {
			filters[filter] = struct{}{}
		}

		columns[name] = base.ColumnMeta{
			Filters: filters,
		}
	}
	r.columns = columns
}
