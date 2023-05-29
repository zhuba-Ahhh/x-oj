import { get } from '../fetch'
import type { ResponseData } from '@/common/axios'
import type { newsType } from '@/types/api'

const newsOriginUrl = 'https://news.icodeq.com/api'

export type newsParams = {
  index: string, // 说明：0-99 用来控制天数，0 为今天，1 为昨天，依次类推
  cache: string, // 说明：清除缓存用 如2023-4-17
  origin: string // 说明："zhihu" 或 "163" 切换源
}

export function getNews(params: newsParams) {
  return get<ResponseData<newsType>>(newsOriginUrl, params)
}