const url = "http://localhost:1100/news"

export const getNews = async () => {
    const res = await fetch(url)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        // data.sort((a, b) => {
        //     return new Date(b.date) - new Date(a.date)
        // })
        return data
    } catch (error) {
        console.error("Xəta baş verdi:", error)
        throw error
    }
}

export const getNewsId = async (newsId) => {
    const res = await fetch(`${url}/${newsId}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${response.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}