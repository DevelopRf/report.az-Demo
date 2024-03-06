'use client'
import { createContext, useContext, useState, useEffect, useRef } from "react"

export const HookContext = createContext()

export const HookProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [term, setTerm] = useState("")
    const [update, setUpdate] = useState(false)
    const [searchValue, setSearchValue] = useState(null)
    const [newsId, setNewsId] = useState("")
    const [title, SetTitle] = useState("")
    const [image, setImage] = useState("")
    const [cat, setCat] = useState("")
    const [subCat, setSubCat] = useState("")
    const [type, setType] = useState("")
    const [slide, SetSlide] = useState()
    const [urgent, setUrgent] = useState()
    const [important, sertImportant] = useState()
    const [paid, setPaid] = useState()
    const [text, setText] = useState("")
    const [dark, setDark] = useState(false)
    const [author, setAuthor] = useState({})
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const theme = window.localStorage.getItem("theme")
        if (theme === "dark Mode") {
            document.body.classList.add("active")
            setDark(true)
        }
        else {
            document.body.classList.remove("active")
            setDark(false)
        }
    }, [dark])

    const sharedState = { toggle, setToggle, term, setTerm, update, setUpdate, searchValue, setSearchValue, newsId, setNewsId, title, SetTitle, cat, setCat, image, setImage, subCat, setSubCat, type, setType, slide, SetSlide, urgent, setUrgent, important, sertImportant, paid, setPaid, text, setText, dark, setDark, author, setAuthor, userData, setUserData }


    return (
        <HookContext.Provider value={sharedState}>
            {children}
        </HookContext.Provider>
    )

}

export function useAppContext() {
    return useContext(HookContext)
}