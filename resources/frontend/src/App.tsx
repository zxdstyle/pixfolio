import RouterProvider from '@/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider />
        </QueryClientProvider>
    )
}
