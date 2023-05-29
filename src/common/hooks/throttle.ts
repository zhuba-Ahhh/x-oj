export const throttle = (fn: Function, delay: number) => {
  let timer: number | null = null
  return () => {
    if(timer) return
    timer = setTimeout(() => {
      fn.call(this)
      timer = null
    }, delay)
  }
}