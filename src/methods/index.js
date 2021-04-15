import { useRouter } from 'vue-router'
const route = useRouter()

export const getTime = (time) => {
    console.log(time)
    let minutes = parseInt(time / 60)
    let seconds = time % 60
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    return minutes + ':' + seconds
}

export const back = () => {
    route.back()
}