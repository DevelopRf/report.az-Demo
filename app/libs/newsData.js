export const url = "http://localhost:1100"
import { unstable_noStore as noStore } from "next/cache";

export const getNews = async () => {
    noStore();
    const res = await fetch(`${url}/news`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        return data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
    } catch (error) {
        console.error("Xəta baş verdi:", error)
        throw error
    }
}

export const getSingleNews = async (news_id) => {
    const res = await fetch(`${url}/news/${news_id}`)
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
    const res = await fetch(`${url}/news?catUrl=${cat}`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumatlar əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()

        return data.sort((a, b) => {
            return (new Date(b.date) - new Date(a.date))
        })
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getSingleSubCategory = async (cat) => {
    const res = await fetch(`${url}/news?subCatUrl=${cat}`)
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
    const res = await fetch(`${url}/categories`)
    try {
        if (!res.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
        }
        const data = await res.json()
        const dataFilter = await data.filter(item => item.catUrl !== "/" && item.catUrl !== "/son-xeberler")
        return dataFilter
    } catch (error) {
        console.error('Xəta baş verdi', error)
        throw error
    }
}

export const getNewsType = async () => {
    const res = await fetch(`${url}/news_type`)
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
    const res = await fetch(`${url}/video_slider`)
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

export function convertToJSON(text) {
    const lines = text.split("\n");

    const paragraphs = lines.map((line) => `<p>${line.trim()}</p>`);

    let formattedText = paragraphs.join("");

    formattedText = formattedText.replace(
        /"report.az"/g,
        `<a href=\"/\">report.az</a>`
    );
    formattedText = formattedText.replace(
        /"report"/g,
        `<a href=\"/\">report</a>`
    );
    formattedText = formattedText.replace(
        /"Report"/g,
        `<a href=\"/\">Report</a>`
    );
    formattedText = formattedText.replace(/\*b(.*?)\*b/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\*i(.*?)\*i/g, "<em>$1</em>");
    formattedText = formattedText.replace(/\*m(.*?)\*m/g, "<strong><em>$1</em></strong>");

    return formattedText;
}

export function convertFromJSON(json) {
    const text = json;

    const regex = /<p>(.*?)<\/p>|<a[^>]*>(.*?)<\/a>/g;

    const extractedText = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match[1]) {
            extractedText.push(match[1]);
        } else if (match[2]) {
            extractedText.push(match[2]);
        }
    }
    const plainText = extractedText.join("\n");

    return plainText;
}

export const getUser = async () => {
    noStore()
    const user = await fetch(`${url}/users`)
    try {
        if (!user.ok) {
            throw new Error(`Məlumat əldə edilə bilmədi. Status: ${user.status}`)
        }
        const data = await user.json()
        return data
    } catch (error) {
        console.error("Xəta baş verdi", error)
        throw error
    }
}

export const convertChars = (txt) => {
    const chars = {
        Ç: "C",
        ç: "c",
        Ə: "E",
        ə: "e",
        Ö: "O",
        ö: "o",
        Ü: "U",
        ü: "u",
        Ğ: "G",
        ğ: "g",
        Ş: "S",
        ş: "s",
        İ: "I",
        ı: "i"
    }

    const slug = txt
        .replace(/[Ç,ç,Ə,ə,Ö,ö,Ü,ü,Ğ,ğ,Ş,ş,İ,ı]/g, (char) => chars[char] || char)
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-+/g, "")
        .replace(/-+$/g, "")
        .toLowerCase()

    return slug
}