export const API_URL = (() => {
  // return 'https://bing.icodeq.com';
  return 'https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_all.json'
})();

export const api = (url: string) => {
  return `${ API_URL }${ url }`;
};