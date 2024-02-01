import { getSingleNews } from "@/app/libs/newsData"
import styles from "./SingleNews.module.scss"

const singlePage = async ({ params: { newsId } }) => {

    const singleNews = await getSingleNews(newsId)
    return (
        singleNews &&
        <section>
            <h2>{singleNews.title}</h2>
            <div dangerouslySetInnerHTML={
                {
                    __html: singleNews.text
                }}>

            </div>

        </section>
    )
}

export default singlePage