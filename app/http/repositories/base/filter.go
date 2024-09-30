package base

import (
	"fmt"
	contracts "github.com/goravel/framework/contracts/database/orm"
	"github.com/goravel/framework/contracts/http"
	"github.com/zxdstyle/pixfolio/app/constants"
	"strings"
)

type (
	Filter interface {
		Do(tx contracts.Query) contracts.Query
	}

	FilterItem struct {
		Field    string
		Operator constants.Operator
		Value    interface{}
	}
)

func (item FilterItem) Do(tx contracts.Query) contracts.Query {
	return item.Operator.Do(tx, item.Field, item.Value)
}

func BuildFilter(ctx http.Context, columns map[string]ColumnMeta) ([]Filter, error) {
	var (
		filters = make([]Filter, 0)
		queries = ctx.Request().Queries()
	)

	for key, val := range queries {
		if len(val) == 0 {
			continue
		}

		if strings.HasPrefix(key, "_") {
			continue
		}
		var (
			ele      = strings.Split(key, "[")
			field    = ele[0]
			operator = "eq"
		)
		if len(ele) == 2 {
			operator = strings.Trim(ele[1], "]")
		}

		col, ok := columns[field]
		if !ok {
			return nil, fmt.Errorf("field '%s' not found", field)
		}

		if _, ex := col.Filters[operator]; !ex && !strings.HasSuffix(field, "id") {
			return nil, fmt.Errorf("field '%s' not support operator '%s'", field, operator)
		}

		op, ok := constants.Operators[operator]
		if !ok {
			return nil, fmt.Errorf("operator '%s' not implement", operator)
		}

		filters = append(filters, FilterItem{
			Field:    field,
			Operator: op,
			Value:    val,
		})
	}
	return filters, nil
}

type CustomFilter func(tx contracts.Query) contracts.Query

func (f CustomFilter) Do(tx contracts.Query) contracts.Query {
	return f(tx)
}

func BuildCustomFilter(f CustomFilter) CustomFilter {
	return f
}
