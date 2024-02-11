import SingleNews from "@/app/components/SingleNews/SingleNews"
import { getSingleNews } from "@/app/libs/newsData"
import { getNews } from "@/app/libs/newsData"

const singleNews = async ({ params: { newsId } }) => {
    const newsData = await getSingleNews(newsId)
    const latestNews = await getNews()
    return <SingleNews singleNews={newsData} latestNews={latestNews} />
}

export default singleNews