package base

import (
	"context"
	"fmt"
	contracts "github.com/goravel/framework/contracts/database/orm"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/database/gorm"
	"github.com/goravel/framework/facades"
	"github.com/spf13/cast"
	"golang.org/x/sync/errgroup"
	"gorm.io/gorm/schema"
	"reflect"
	"strings"
)

type (
	ColumnMeta struct {
		Filters map[string]struct{}
	}

	Crud[M any, K comparable] struct {
		columns   map[string]ColumnMeta
		tableName string
	}
)

func NewCrud[M any, K comparable]() *Crud[M, K] {
	c := &Crud[M, K]{}

	var (
		m  M
		mt = reflect.Indirect(reflect.ValueOf(m)).Type()
	)

	var model any = m
	if tabler, ok := model.(schema.Tabler); ok {
		c.tableName = tabler.TableName()
	} else {
		c.tableName = facades.Orm().Query().(*gorm.QueryImpl).Instance().NamingStrategy.TableName(mt.Name())
	}

	return c
}

func (c *Crud[M, K]) List(ctx http.Context, filters []Filter) (mos []*M, err error) {
	var (
		group = errgroup.Group{}

		start = ctx.Request().QueryInt("_start", 0)
		end   = ctx.Request().QueryInt("_end", 20)

		pageSize = end - start
	)

	group.Go(func() error {
		tx := facades.Orm().WithContext(ctx).Query().Limit(pageSize).Model(new(M))

		tx = c.parseSort(ctx, tx)

		tx = c.parsePreload(ctx, tx)

		for _, filter := range filters {
			tx = filter.Do(tx)
		}

		if start > 0 {
			tx = tx.Offset(start)
		}

		return tx.Find(&mos)
	})

	group.Go(func() error {
		var (
			total int64
			m     M
			tx    = facades.Orm().WithContext(ctx).Query().Model(m)
		)

		for _, filter := range filters {
			tx = filter.Do(tx)
		}

		if err = tx.Count(&total); err != nil {
			return err
		}
		ctx.Response().Header("x-total-count", cast.ToString(total))
		return nil
	})

	err = group.Wait()
	return
}

func (c *Crud[M, K]) parseSelect(ctx http.Context, tx contracts.Query) contracts.Query {
	var (
		selects = ctx.Request().Query("_select")

		cols = strings.Split(selects, ",")
	)

	if len(selects) == 0 {
		return tx
	}

	fields := make([]string, 0, len(selects))
	for _, col := range cols {
		if _, ok := c.columns[col]; ok {
			fields = append(fields, col)
		}
	}

	if len(fields) == 0 {
		return tx
	}

	return tx.Select(fields)
}

func (c *Crud[M, K]) parseSort(ctx http.Context, tx contracts.Query) contracts.Query {
	var (
		order = ctx.Request().Query("_order")
		sort  = ctx.Request().Query("_sort")

		orders = strings.Split(order, ",")
		sorts  = strings.Split(sort, ",")
	)

	if len(sort) == 0 || len(order) == 0 {
		return tx
	}

	if len(orders) > 0 && len(orders) == len(sorts) {
		for i, field := range sorts {
			tx = tx.OrderBy(fmt.Sprintf("`%s`.`%s`", c.tableName, field), orders[i])
		}
	}

	return tx
}

func (c *Crud[M, K]) parsePreload(ctx http.Context, tx contracts.Query) contracts.Query {
	var (
		preload = ctx.Request().Query("_preload")
	)

	if len(preload) == 0 {
		return tx
	}

	var (
		relations = strings.Split(preload, ",")
	)

	for _, relation := range relations {
		tx = tx.With(relation)
	}

	return tx
}

func (c *Crud[M, K]) Store(ctx context.Context, m *M) error {
	return facades.Orm().WithContext(ctx).Query().Create(m)
}

func (c *Crud[M, K]) Show(ctx http.Context, id K, m *M) error {
	tx := facades.Orm().WithContext(ctx).Query()

	tx = c.parsePreload(ctx, tx)

	return tx.Limit(1).Find(m, id)
}

func (c *Crud[M, K]) Edit(ctx http.Context, id K, m *M) error {
	res, err := facades.Orm().WithContext(ctx).Query().Where("`id` = ?", id).Update(m)
	if err != nil {
		return err
	}
	if res.RowsAffected > 0 {
		return c.Show(ctx, id, m)
	}
	return nil
}

func (c *Crud[M, K]) Delete(ctx context.Context, id K) error {
	var m M
	_, err := facades.Orm().WithContext(ctx).Query().Where("`id` = ?", id).Delete(&m)
	return err
}
