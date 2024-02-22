'use client'
import { createContext, useContext, useState } from "react"

export const HookContext = createContext()

export const HookProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [term, setTerm] = useState("")
    const [update, setUpdate] = useState(false)
    const [searchData, setSearchData] = useState({})
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

    const sharedState = { toggle, setToggle, term, setTerm, update, setUpdate, searchData, setSearchData, newsId, setNewsId, title, SetTitle, cat, setCat, image, setImage, subCat, setSubCat, type, setType, slide, SetSlide, urgent, setUrgent, important, sertImportant, paid, setPaid, text, setText}


    return (
        <HookContext.Provider value={sharedState}>
            {children}
        </HookContext.Provider>
    )

}

export function useAppContext() {
    return useContext(HookContext)
}