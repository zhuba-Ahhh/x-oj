export const API_URL = (() => {
  return 'https://hdoi.cn';
})();

export const api = (url: string) => {
  return `${API_URL}${url}`;
};