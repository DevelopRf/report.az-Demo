import SingleNews from "@/app/components/SingleNews/SingleNews"
import { getSingleNews, getNews, getUser } from "@/app/libs/newsData"
import NotFound from "@/app/components/NotFound/NotFound"

export async function generateMetadata({ params: { newsId } }) {
    const news = await getNews()
    const data = news.find(item => item.id === newsId)


    console.log(typeof newsId)
    if (data) {
        return {
            title: `${data.title} | Report.az`
        }
    }
}

const singleNews = async ({ params: { newsId } }) => {
    const userInfo = await getUser()
    const news = await getNews()
    const data = news.find(item => item.id === newsId)

    if (data) {
        const singleNews = await getSingleNews(newsId)
        return <SingleNews singleNews={singleNews} latestNews={news} userInfo={userInfo} />
    }
    else {
        return <NotFound />
    }
}

export default singleNews