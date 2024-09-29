import banner from '@/assets/images/marketing.png'
import bg from '@/assets/images/marketing-shape.png'
import { Button, Form, Input } from '@/components/ui'
import { A, useNavigate, useSearchParams } from '@solidjs/router'
import { useCreate } from '@solidjs-components/refine'

type LoginForm = {
    username: string
    password: string
    captcha_code: string
}
export default function Login() {
    const mutation = useCreate()
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const handleSubmit = (values: LoginForm) => {
        mutation.mutate({
            resource: 'login',
            values,
        }, {
            onSuccess: ({ data }) => {
                if (data) {
                    localStorage.setItem('authorization', data.token)
                    navigate(params.to || '/admin', { replace: true })
                }
            },
        })
    }

    return (
        <div class="grid grid-cols-12 w-full h-screen">
            <div class="col-span-6 bg-center bg-cover h-full bg-slate-300/30" style={{ 'background-image': `url(${bg})` }}>
                <div class="flex flex-col items-center justify-center gap-12 h-full">
                    <img src={banner} class="w-1/2" alt="" />

                    <div class="text-center">
                        <p class="text-center text-lg text-slate-500">
                            © 2024 Privtorr. Design with  by
                            {' '}
                            <A href="https://github.com/zxdstyle" class="underline" target="_blank">zxdstyle</A>
                            .
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-span-6 h-full flex flex-col">
                <div class="p-6 flex justify-end">
                    {/* <ToggleLocale /> */}
                    <A href="https://github.com/zxdstyle/pixfolio" target="_blank">
                        <IconMdiGithub class="text-2xl" />
                    </A>
                </div>

                <div class="h-full flex justify-center items-center">
                    <div class="w-96 flex flex-col">
                        <h1 class="text-4xl">欢迎回来</h1>
                        <p class="mt-2 mb-10 text-black/40">Welcome back to Pixfolio.</p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Item<LoginForm> name="username">
                                <Input size="large" placeholder="请输入账号" required />
                            </Form.Item>

                            <Form.Item<LoginForm> name="password">
                                <Input type="password" size="large" placeholder="请输入密码" required />
                            </Form.Item>

                            <Button disabled={mutation.isPending} type="submit" block>登录</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
