'use client'
import { createContext, useState } from "react"

export const HookContext = createContext()

export const HookProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <HookContext.Provider value={{ toggle, setToggle }}>
            {children}
        </HookContext.Provider>
    )
}