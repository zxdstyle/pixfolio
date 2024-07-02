export function humanReadableFilesize(size: number) {
    if (!size)
        return 0
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    const mod = 1024.0
    let i = 0
    while (size >= mod) {
        size /= mod
        i++
    }
    // return Math.round(size) + units[i];
    return formatNum(size, 1) + units[i]
}

// 格式化数字类型,保留小数点后几位,非四舍五入
// size:值
// n:保留位数
function formatNum(size: number, n: number) {
    const sizeStr = size.toString()
    if (sizeStr.lastIndexOf('.') > -1)
        return sizeStr.substring(0, sizeStr.toString().indexOf('.') + 1 + n)
    else
        return sizeStr
}
