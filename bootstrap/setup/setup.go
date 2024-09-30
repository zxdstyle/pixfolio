package setup

import (
	"embed"
	"os"
	"strings"
)

//go:embed .env.example
var defaultEnv embed.FS

func init() {
	createDirIfNotExist("./storage/app/")

	checkEnv()
}

func createDirIfNotExist(dir string) {
	_, err := os.Stat(dir)
	if err == nil {
		return
	}
	if os.IsNotExist(err) {
		if strings.HasSuffix(dir, "/") {
			if err := os.MkdirAll(dir, 0755); err != nil {
				panic(err)
			}
		} else {
			if _, err := os.Create(dir); err != nil {
				panic(err)
			}
		}
	}

}

func checkEnv() {
	_, err := os.Stat(".env")
	if err == nil {
		return
	}

	if os.IsNotExist(err) {
		def, err := defaultEnv.ReadFile(".env.example")
		if err != nil {
			panic(err)
		}

		if err := os.WriteFile(".env", def, 0644); err != nil {
			panic(err)
		}
	}
}
