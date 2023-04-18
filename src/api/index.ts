import { api } from '../common/const';
import { get } from '../common/axios';
import type { IResp } from '../common/axios';

// Bing随机一图
export function getBingImg() {
    return get<IResp<any>>(api(''));
}