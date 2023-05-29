import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ref } from 'vue'

export interface ResponseData<T = any> {
  data: T,
  status: number,
  msg: string,
}

interface RequestOptions extends AxiosRequestConfig {
  errorMessageMode?: 'none' | 'modal'
}

export default function useRequest() {
  const loading = ref(false)

  const handleResponseError = (error: AxiosError) => {
    console.error(error)

    // if (error?.config?.errorMessageMode === 'modal') {
    //   // show error modal
    // }

    return Promise.reject(error)
  }

  const request = async <T = any>(options: RequestOptions): Promise<T> => {
    loading.value = true

    try {
      const response: AxiosResponse<ResponseData<T>> = await axios(options)

      if (response.data) {
        return response.data as any
      } else {
        throw new Error(response.data)
      }
    } catch (e: any) {
      return handleResponseError(e)
    } finally {
      loading.value = false
    }
  }

  const get = <T = any>(url: string, params?: any, config?: RequestOptions) =>
    request<T>({ url, method: 'get', params, ...config })

  const post = <T = any>(url: string, data?: any, config?: RequestOptions) =>
    request<T>({ url, method: 'post', data, ...config })

  const put = <T = any>(url: string, data?: any, config?: RequestOptions) =>
    request<T>({ url, method: 'put', data, ...config })

  const del = <T = any>(url: string, config?: RequestOptions) =>
    request<T>({ url, method: 'delete', ...config })

  return {
    loading,
    get,
    post,
    put,
    delete: del,
  }
}
