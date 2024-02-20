'use client'
import AllNews from "../AllNews/AllNews";
import { useContext, useEffect } from "react";
import { HookContext } from "@/app/Hooks/Hook";
import { getSearch } from "@/app/libs/newsData";

const SearchNews = () => {
    const { searchData } = useContext(HookContext)

    useEffect(() => {
        const search = async () => {
            const data = await getSearch(searchData)

            return <AllNews news={data} />
        }
        search()
    }, searchData)

}

export default SearchNews