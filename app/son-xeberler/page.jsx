import { getNews, getUser } from "../libs/newsData"
import AllNews from "../components/AllNews/AllNews"

export const metadata = {
    title: "Son xəbərlər (Xeberler) | Azərbaycan və dünya xəbərləri | Report.az"
}

const latest = async () => {

    const data = await getNews()
    const userInfo = await getUser()
    return (
        <main>
            <AllNews news={data} />
        </main>
    )
}

export default latest