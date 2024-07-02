import type { LiveProvider } from '@refinedev/core'

class SSELiveProvider implements LiveProvider {
    baseUrl: string

    sse: EventSource | undefined

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    subscribe(options: { channel: any, callback: (arg0: any) => void }) {
        this.sse = new EventSource(`${this.baseUrl}/${options.channel}`)

        this.sse.onmessage = (e) => {
            options.callback(e.data)
        }
    }

    unsubscribe() {
        this.sse?.close()
    }
}

export default function (baseUrl: string): LiveProvider {
    return new SSELiveProvider(baseUrl)
}
