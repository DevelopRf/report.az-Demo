export function timeformat(time) {
    time < 10 && (time = '0' + time)
    return time
}

export const convertDateUTC = (date)=>{
    const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
        "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ]

    const d = new Date(date)
    const day = d.getUTCDate()
    const month = months[d.getUTCMonth()]
    const year = d.getUTCFullYear()

    return `${day} ${month}, ${year}`

}

export const convertTimeUTC = (timeEntered) => {
    const d = new Date(timeEntered)
    const hour = d.getUTCHours()
    const minute = d.getUTCMinutes()

    return `${timeformat(hour)}: ${timeformat(minute)}`
}