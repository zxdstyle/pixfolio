class HumanSize {
    num: number = 0

    unit: string = ''

    constructor(size: number, unit: string) {
        this.num = size
        this.unit = unit
    }

    toString() {
        return `${this.num} ${this.unit}`
    }
}

export function humanSize(val: number = 0) {
    let i = -1
    const units = 'KB MB GB TB PB EB'.split(' ')
    do {
        val = val / 1024
        i++
    } while (val > 1024)

    const size = Number(val.toFixed(2))

    return new HumanSize(size, units[i])
}

// 格式化数字类型,保留小数点后几位,非四舍五入
// size:值
// n:保留位数
export function formatNum(size: number, n: number) {
    const sizeStr = size.toString()
    if (sizeStr.includes('.'))
        return sizeStr.substring(0, sizeStr.toString().indexOf('.') + 1 + n)
    else
        return sizeStr
}
