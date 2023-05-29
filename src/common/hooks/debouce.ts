export const debounce = (fn: Function, delay: number) => {
  let timer: number | null | undefined = null
  return () => {
      if(timer) clearTimeout(timer)
      timer = setTimeout(fn, delay)
  }
}