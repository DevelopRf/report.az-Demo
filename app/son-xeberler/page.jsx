import { getNews } from "../libs/newsData"
import AllNews from "../components/AllNews/AllNews"

export const metadata = {
title: "Son xəbərlər (Xeberler) | Azərbaycan və dünya xəbərləri | Report.az"
}

const latest = async () => {

    const  data = await getNews()
    
    return (
         <AllNews news={data} />
    )
}

export default latest