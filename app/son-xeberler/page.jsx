import { getNews } from "../libs/newsData"
import AllLatestNews from "../components/AllNews/AllNews"

const latest = async () => {

    const  data = await getNews()
    
    return (
         <AllLatestNews news={data} />
    )
}

export default latest