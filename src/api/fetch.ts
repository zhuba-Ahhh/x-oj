import useRequest from '@/common/axios'

export const get = useRequest().get
export const post = useRequest().post
export const put = useRequest().put
export const del = useRequest().delete
export const loading = useRequest().loading