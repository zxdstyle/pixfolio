import type { InputProps } from 'antd'
import { Form, Input, theme } from 'antd'

export interface Props extends Omit<InputProps, 'variant'> {
    variant?: InputProps['variant'] | 'underline'
}

export default function ({ variant, ...props }: Props) {
    const { token } = theme.useToken()

    const { status } = Form.Item.useStatus()

    const color = status === 'error' ? token.colorError : token.colorBorder

    return (
        <Input
            variant={variant === 'underline' ? 'borderless' : variant}
            style={variant === 'underline' ? { borderRadius: 0, borderBottom: `1px solid ${color}` } : {}}
            {...props}
        />
    )
}
