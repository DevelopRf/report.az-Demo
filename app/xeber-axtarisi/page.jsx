import AllNews from "../components/AllNews/AllNews"
import { getNews } from "../libs/newsData"
const search = async () => {
    const data = await getNews()
    
    return (
        <AllNews searchNews={data} />
    )
}

export default search