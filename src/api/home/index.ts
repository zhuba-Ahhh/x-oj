import { get } from '@/api/fetch'
import { api } from '@/common/const'
import type { ResponseData } from '@/common/axios'

// 首页轮播图片

export interface carouselImg {
  url: string,
  id: number,
}

export function getHomeCarouselImg() {
  return get<ResponseData<carouselImg []>>(api('/api/home-carousel'))
}