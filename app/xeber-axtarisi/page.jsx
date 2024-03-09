import AllNews from "../components/AllNews/AllNews"
import { getNews } from "../libs/newsData"

export const metadata = {
    title: "Xəbər axrarışı | Report.az"
}

const search = async () => {
    const data = await getNews()

    return (
        <AllNews searchNews={data} />
    )
}

export default search