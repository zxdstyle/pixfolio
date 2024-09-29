package base

import "github.com/spf13/cast"

func UintConverter(a any) uint {
	return cast.ToUint(a)
}

func Uint64Converter(a any) uint64 {
	return cast.ToUint64(a)
}
