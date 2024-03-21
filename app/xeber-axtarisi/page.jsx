import AllNews from "../components/AllNews/AllNews"
import { getNews } from "../libs/newsData"

export const metadata = {
    title: "Xəbər axrarışı | Report.az"
}

const search = async () => {
    const data = await getNews()

    return (
        <main>
            <AllNews searchNews={data} />
        </main>
    )
}

export default search