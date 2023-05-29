import { get } from '../fetch'
import type { ResponseData } from '@/common/axios'
import type { bingImg } from '@/types/api'

const imgOriginUrl = 'https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/'

// Bing图

export function getBingImg(nation: string) {
  return get<ResponseData<bingImg[]>>(`${imgOriginUrl + nation}_all.json`)
}