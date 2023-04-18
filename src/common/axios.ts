import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocalValue, setLocalValue } from '@/common/localStore'
import { ElMessage } from 'element-plus'

// const loading = useLoadingStore();

export function initAxiosConfig() {
    /** 全局配置 */
    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
}

/**
 * 全局接口报错handler
 */
const globalToastErrorHandler = (toastError: boolean) => (response: { status: boolean; data: { result: number; message: any; }; }) => {
    // if (response instanceof Error) {
    //     // status !== 200 , 如服务器挂了500，服务器不存在0
    //     ElMessage({ message: '系统繁忙，请稍后再试' })
    //     return Promise.reject(response);
    // }

    // if (response.status !== true) {
    //     // 如果不是登录接口
    //     if (response.data.result !== 109 && toastError) {
    //         // 后端返回错误文案 很多两行展示不下 所以 设置 lineClamp
    //         ElMessage({ message: `${ response.data.message }` })
    //     }
    //     return Promise.reject(response.data);
    // }
    return response.data;
};

/**
 * 接口最短时间控制handler
 */
const minTimeHandler = function minTimeHandler<T>(promise: Promise<T>, minTime = 0): Promise<T> {
    if (minTime) {
        return Promise.all([
            promise,
            new Promise(resolve => {
                setTimeout(resolve, minTime);
            }),
        ])
            .then(([res]) => {
                return res;
            })
            .catch(e => {
                // 正常返回，统一走到 globalToastErrorHandler 里面处理
                return Promise.resolve(e);
            });
    }
    return promise;
};

export interface IResp<T = any> {
    result: number;
    data: T;
    message: string;
    status: boolean;
}

export interface IAxiosExtra {
    /** 是否增加全局的loading; default: false */
    loading?: boolean;
    /** 是否全局拦截错误并toast提示; default: true */
    toastError?: boolean;
    /** 有些接口需要一些动画效果，接口返回太快，会导致页面闪烁，此时使用minTime，会等待时间再返回 */
    minTime?: number;
}

export interface IAxiosCacheCallback<R = any> {
    (err: any, res: IResp<R>): void;
}

export interface IAxiosExtrax<R> extends IAxiosExtra {
    /**
     * @deprecated  不太好控制， 不建议使用了
     * 是否增加本地cache，如果网络失败，会走本地cache; default: false; 请注意只在纯读操作接口使用，不要在写操作接口使用
     */
    cache: true;
    /** 判断是否可以缓存解决; default:  (res) => res.result === 1 */
    canCache?: (res: any) => boolean;
    /** 开启cache的时候，走callback，不返回Promise */
    callback: IAxiosCacheCallback<R>;
}

export interface IAxiosData {
    [key: string]: any;
}

export const defaultCanCacheImpl = <T extends { result: number }>(res: T) => res.result === 1;

const localPrefix = 'X_OJ';

/**
 * get函数类型定义
 */
export function get<T = any>(url: string, config?: AxiosRequestConfig, extra?: IAxiosExtra): Promise<T>;
export function get<T = any>(url: string, config?: AxiosRequestConfig, extra?: IAxiosExtrax<T>): void;

export function get<T = any>(url: string, config?: AxiosRequestConfig, extra?: IAxiosExtrax<T> | IAxiosExtra) {
    return request(url, extra as IAxiosExtrax<T>, () => axios.get(url, config));
}

/**
 * post函数类型定义
 */
export function post<T = any>(url: string, data?: IAxiosData, config?: AxiosRequestConfig, extra?: IAxiosExtra): Promise<T>;
export function post<T = any>(url: string, data?: IAxiosData, config?: AxiosRequestConfig, extra?: IAxiosExtrax<T>): void;

export function post<T = any>(url: string, data: IAxiosData = {}, config?: AxiosRequestConfig, extra?: IAxiosExtrax<T> | IAxiosExtra) {
    return request(url, extra as IAxiosExtrax<T>, () => axios.post(url, data, config));
}

export function request<T = any>(url: string, extra: IAxiosExtrax<T>, handler: () => Promise<AxiosResponse<any>>) {
    const { loading = false, cache = false, canCache = defaultCanCacheImpl, callback, toastError = true, minTime = 0 } = extra || {};
    if (!cache) {
        if (loading) {
            // store.commit('loading', true);
            // loading.incrementLoading();
        }
        // 不走缓存，直接返回
        return minTimeHandler(handler(), minTime)
            .then(globalToastErrorHandler(toastError))
            .then(res => {
                if (loading) {
                    // store.commit('loading', false);
                    // store.common.loading--;
                }
                return Promise.resolve(res);
            })
            .catch(e => {
                if (loading) {
                    // store.commit('loading', false);
                    // store.common.loading--;
                }
                return Promise.reject(e);
            });
    }

    // 尝试加载缓存
    const cacheRes = getLocalValue<IResp<T>>(`${localPrefix}${url}`);
    if (cacheRes) {
        // 第一次使用cache返回
        callback(null, cacheRes);
    }

    minTimeHandler(handler(), minTime)
        .then(globalToastErrorHandler(toastError))
        .then((res: any) => {
            // cache结果
            if (canCache && canCache(res)) {
                setLocalValue(`${localPrefix}${url}`, res);
            }
            // 第二次使用实时数据返回
            callback(null, res);
        })
        .catch(e => {
            callback(e, { result: -1, data: null as any, message: '' });
        });
}

/**
 * 处理formdata请求
 */
export function formData<T = any>(url: string, data: IAxiosData = {}, config: AxiosRequestConfig = {}, extra: IAxiosExtra = {}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const { loading, toastError = true, minTime = 0 } = extra;
        const form = new FormData();
        Object.keys(data).forEach(key => {
            form.append(key, data[key]);
        });
        if (loading) {
            // store.commit('loading', true);
            // store.common.loading++;
        }

        minTimeHandler(axios.post<T>(url, form, config), minTime)
            .then(globalToastErrorHandler(toastError))
            .then((res: any) => {
                if (loading) {
                    // store.commit('loading', false);
                    // store.common.loading--;
                }
                resolve(res);
            })
            .catch(err => {
                if (loading) {
                    // store.commit('loading', false);
                    // store.common.loading--;
                }
                reject(err);
            });
    });
}
