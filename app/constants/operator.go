package constants

import (
	"fmt"
	contracts "github.com/goravel/framework/contracts/database/orm"
)

var (
	Operators = map[string]Operator{
		"eq":    Eq("eq"),
		"gt":    Gt("gt"),
		"gte":   Gte("gte"),
		"lt":    Lt("lt"),
		"lte":   Lte("lte"),
		"match": Match("lte"),
	}
)

type Operator interface {
	Do(tx contracts.Query, field, value any) contracts.Query
}

type Eq string

func (Eq) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(field, value)
}

type Gt string

func (Gt) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(fmt.Sprintf("`%s` > ?", field), value)
}

type Gte string

func (Gte) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(fmt.Sprintf("`%s` >= ?", field), value)
}

type Lt string

func (Lt) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(fmt.Sprintf("`%s` < ?", field), value)
}

type Lte string

func (Lte) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(fmt.Sprintf("`%s` <= ?", field), value)
}

type Match string

func (Match) Do(tx contracts.Query, field, value any) contracts.Query {
	return tx.Where(fmt.Sprintf("`%s` LIKE ?", field), fmt.Sprintf("%%%s%%", value))
}
