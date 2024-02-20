const url = "http://localhost:1100/news"
const urlcat = "http://localhost:1100/category"
const urltype = "http://localhost:1100/news_type"
const urlvideo = "http://localhost:1100/video_slider"

export const getNews = async () => {
    const res = await fetch(url)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        return data
    } catch (error) {
        console.error("Xəta baş verdi:", error)
        throw error
    }
}

export const getSingleNews = async (news_id) => {
    const res = await fetch(`${url}/${news_id}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        return data

    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getSingleCategory = async (cat) => {
    const res = await fetch(`${url}?catUrl=${cat}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()

        return data
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getSearch = async (item) => {
    const res = await fetch(`${url}?title=${item}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Xəta baş verdi.', error)
        throw error
    }
}

export const getSingleSubCategory = async (cat) => {
    const res = await fetch(`${url}?subCatUrl=${cat}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()

        return data
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getCategories = async () => {
    const res = await fetch(urlcat)
    try {
        if (!res.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getNewsType = async () => {
    const res = await fetch(urltype)
    try {
        if (!res.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        data.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        })
        return data
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getVideoLink = async () => {
    const res = await fetch(urlvideo)
    try {
        if (!res.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Xəta baş verdi", error)
        throw error
    }
}