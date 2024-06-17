import type { SelectProps } from 'antd'
import { Form, Select, theme } from 'antd'

export interface Props extends Omit<SelectProps, 'variant'> {
    variant?: SelectProps['variant'] | 'underline'
}

export default function ({ variant, ...props }: Props) {
    const { token } = theme.useToken()

    const { status } = Form.Item.useStatus()

    const color = status === 'error' ? token.colorError : token.colorBorder

    return (
        <Select
            variant={variant === 'underline' ? 'borderless' : variant}
            style={variant === 'underline' ? { borderRadius: 0, borderBottom: `1px solid ${color}` } : {}}
            {...props}
        />
    )
}
