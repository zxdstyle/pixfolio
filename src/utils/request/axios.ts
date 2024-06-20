import type { HttpError } from '@refinedev/core'
import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        const { code, data, msg } = response.data
        if (code === 0 || response.status === 204) {
            response.data = data
            return response
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ message: msg, status: code })
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        }

        return Promise.reject(customError)
    },
)

export { axiosInstance }
