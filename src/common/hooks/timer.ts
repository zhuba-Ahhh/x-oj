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
        }
    }
}

// 2023-05-01 23:07:23
export const nowTimer = (now: Date) => {
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// "20230501" => "2023-05-01"
export const timeFormat = (time: string) => time.slice(0, 4) + "-" + time.slice(4, 6) + "-" + time.slice(6);