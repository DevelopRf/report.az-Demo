import SingleNews from "@/app/components/SingleNews/SingleNews"
import { getSingleNews } from "@/app/libs/newsData"

const singleSport = async ({ params: { newsId } }) => {
    const newsData = await getSingleNews(newsId)
    return <SingleNews news={newsData} />
}

export default singleSport