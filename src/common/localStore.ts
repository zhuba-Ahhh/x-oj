export function getLocalValue<T>(key: string): T | null {
  const val = window.localStorage.getItem(key);
  if (val) {
      try {
          return JSON.parse(val) as T;
      } catch (e) {
          console.error(e);
          return null;
      }
  }
  return null;
}

export function setLocalValue<T>(key: string, val: T) {
  window.localStorage.setItem(key, JSON.stringify(val));
}
