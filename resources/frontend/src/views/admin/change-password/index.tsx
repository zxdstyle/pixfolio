import { Button, Card, Form, Input } from '@/components/ui'
import { useNavigate } from '@solidjs/router'
import { useCreate } from '@solidjs-components/refine'

type ChangePasswordForm = {
    origin_password: string
    new_password: string
    password_confirm: string
}

export default function ChangePassword() {
    const mutation = useCreate({
        resource: 'change-pwd',
        successNotification: {
            type: 'success',
            description: '修改密码成功,请使用新密码重新登录',
        },
    })

    const navigate = useNavigate()
    const handleSubmit = (values: ChangePasswordForm) => {
        mutation.mutate({
            values,
        }, {
            onSuccess: () => {
                localStorage.removeItem('authentication')
                navigate('/login')
            },
        })
    }

    return (
        <div class="container">
            <Card class="p-12">
                <Form onSubmit={handleSubmit}>
                    <Form.Item<ChangePasswordForm> name="origin_password" label="旧密码">
                        <Input type="password" placeholder="请输入旧密码" required />
                    </Form.Item>
                    <Form.Item<ChangePasswordForm> name="new_password" label="新密码">
                        <Input type="password" placeholder="请输入新密码" required />
                    </Form.Item>
                    <Form.Item<ChangePasswordForm> name="password_confirm" label="确认新密码">
                        <Input type="password" placeholder="请再输入一遍新密码" required />
                    </Form.Item>

                    <Button type="submit">修改密码</Button>
                </Form>
            </Card>
        </div>
    )
}
