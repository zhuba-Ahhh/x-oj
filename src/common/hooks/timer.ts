import { onUnmounted } from 'vue'

export function useTimer(handler: Function, interval: number) {
    let timer: number | undefined

    const initTimer = () => {
        timer = setInterval(() => {
            handler()
        }, interval)
    }

    initTimer()

    onUnmounted(() => {
        clearTimeout(timer)
    })

    return {
        restart() {
            clearTimeout(timer)
            initTimer()
        },
        stopTimer() {
            clearTimeout(timer)
        },
    }
}
