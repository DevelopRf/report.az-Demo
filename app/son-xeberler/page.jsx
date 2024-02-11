import { getNews } from "../libs/newsData"
import AllLatestNews from "../components/AllLatestNews/AllLatestNews"

const latest = async () => {

    const  data = await getNews()
    
    return (
         <AllLatestNews news={data} />
    )
}

export default latest