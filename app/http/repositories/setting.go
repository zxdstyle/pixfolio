package repositories

import (
	"context"
	"errors"
	"fmt"
	"github.com/goravel/framework/database/orm"
	"github.com/goravel/framework/facades"
	"github.com/spf13/cast"
	"github.com/zxdstyle/pixfolio/app/models"
	"time"
)

const expireDuration = time.Hour

type Setting struct {
}

func NewSetting() *Setting {
	return &Setting{}
}

func (s *Setting) get(ctx context.Context, key string, def ...string) (string, error) {
	ck := fmt.Sprintf("cache:settings:%s", key)
	val, err := facades.Cache().Remember(ck, expireDuration, func() (any, error) {
		var setting models.Setting
		err := facades.Orm().WithContext(ctx).Query().Where("`key` = ?", key).FindOrFail(&setting)
		if err != nil && !errors.Is(err, orm.ErrRecordNotFound) {
			return nil, err
		}
		if errors.Is(err, orm.ErrRecordNotFound) && len(def) > 0 {
			if err := s.set(ctx, key, def[0]); err != nil {
				return nil, err
			}
			return def[0], nil
		}
		return setting.Value, nil
	})
	return cast.ToString(val), err
}

func (s *Setting) set(ctx context.Context, key, value string) error {
	var setting models.Setting
	if err := facades.Orm().Query().
		UpdateOrCreate(
			&setting,
			models.Setting{Key: key},
			models.Setting{Value: value},
		); err != nil {
		return err
	}

	ck := fmt.Sprintf("cache:settings:%s", key)
	return facades.Cache().Put(ck, value, expireDuration)
}

func (s *Setting) AppName(ctx context.Context) (string, error) {
	return s.get(ctx, "app.name", "Privtorr")
}
