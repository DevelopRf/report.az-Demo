import SingleNews from "@/app/components/SingleNews/SingleNews"
import { getSingleNews, getNews } from "@/app/libs/newsData"
import NotFound from "@/app/components/NotFound/NotFound"

const singleNews = async ({ params: { newsId } }) => {
    const news = await getNews()
    const data = news.find(item => item.id === newsId)

    if (data) {
        const singleNews = await getSingleNews(newsId)
        return <SingleNews singleNews={singleNews} latestNews={news} />
    }
    else {
        return <NotFound />
    }
}

export default singleNews