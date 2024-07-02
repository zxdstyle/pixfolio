export function FileExt(file: string) {
    const fileName = getFileName(file)
    if (!fileName)
        return null

    switch (fileName) {
        case 'tsconfig.json':
            return <IconLocalTsConfig />
        case 'license':
        case 'LICENSE':
            return <IconLocalLicense />
        case 'vite.config.js':
        case 'vite.config.ts':
            return <IconLocalVite />
        case 'bun.lockb':
            return <IconLocalBun />
        case 'yarn.lock':
            return <IconLocalYarn />
        case 'Dockerfile':
            return <IconLocalDocker />
        case 'pnpm-lock.yaml':
            return <IconLocalPnpm />
    }

    if (file.endsWith('.blade.php'))
        return <IconLocalBlade />

    const ext = file.split('.').pop()

    switch (ext) {
        case 'go':
            return <IconLocalGo />
        case 'psd':
            return <IconLocalPhotoshop />
        case 'json':
            return <IconLocalJson />
        case 'css':
            return <IconLocalCss />
        case 'less':
            return <IconLocalLess />
        case 'yml':
        case 'yaml':
            return <IconLocalYaml />
        case 'ts':
        case 'tsx':
            return <IconLocalTsx />
        case 'js':
        case 'jsx':
        case 'cjs':
        case 'mjs':
            return <IconLocalJs />
        case 'vue':
            return <IconLocalVue />
        case 'md':
            return <IconLocalMarkdown />
        case 'html':
            return <IconLocalHtml />
        case 'xml':
            return <IconLocalXml />
        case 'php':
            return <IconLocalPhp />
        case 'neon':
            return <IconLocalNeon />
        case 'toml':
            return <IconLocalToml />
        case 'jar':
            return <IconLocalJar />
        case 'sh':
            return <IconLocalSh />
        case 'java':
            return <IconLocalJava />
        case 'conf':
            return <IconLocalConf />
        case 'sql':
            return <IconLocalSql />
    }
}

function getFileName(filePath: string) {
    if (!filePath)
        return ''
    const fileArr = filePath.split('/')
    return fileArr[fileArr.length - 1]
}
