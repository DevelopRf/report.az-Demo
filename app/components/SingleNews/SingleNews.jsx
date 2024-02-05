import styles from "./SingleNews.module.scss"
import { getNews } from "@/app/libs/newsData"

const SingleNews = ({ news }) => {
    return (
        news &&
        <section className={styles.content}>
            <h2>{news.title}</h2>
            <div dangerouslySetInnerHTML={
                {
                    __html: news.text
                }}>
            </div>
        </section>

    )
}

export default SingleNews