'use client'
import { createContext, useState } from "react"

export const HookContext = createContext()

export const HookProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [term, setTerm] = useState("")
    const [update, setUpdate] = useState(false)
    const [searchData, setSearchData] = useState({})

    return (
        <HookContext.Provider value={{ toggle, setToggle, term, setTerm, update, setUpdate, searchData, setSearchData }}>
            {children}
        </HookContext.Provider>
    )
}