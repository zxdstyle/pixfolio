import type { HttpError } from '@solidjs-components/refine'
import type { ParentProps } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { DataContextProvider } from '@solidjs-components/refine'
import dataProvider from '@solidjs-components/simple-rest'
import { toast, Toaster } from 'solid-sonner'

export default function GlobalLayout(props: ParentProps) {
    const navigate = useNavigate()
    const handleError = (error: HttpError) => {
        if (error.statusCode === 401) {
            localStorage.removeItem('authorization')
            navigate('/login')
        }
    }

    return (
        <DataContextProvider
            dataProvider={dataProvider('/api/v1')}
            errorHandler={handleError}
            notification={{
                open: (params) => {
                    switch (params.type) {
                        case 'success':
                            toast.success(params.description, { id: params.key })
                            break
                        case 'error':
                            toast.error(params.description, { id: params.key })
                            break
                        default:
                            toast(params.description, { id: params.key })
                    }
                },
                close: key => toast.dismiss(key),
            }}
        >
            <Toaster position="top-center" richColors closeButton></Toaster>
            {props.children}
        </DataContextProvider>
    )
}
