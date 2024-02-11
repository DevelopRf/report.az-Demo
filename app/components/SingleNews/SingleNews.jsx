'use client'
import styles from "./SingleNews.module.scss"
import LatestNews from "../LatestNews/LatestNews"
import Image from "next/image"
import Link from "next/link"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"

const SingleNews = ({ singleNews, latestNews }) => {
    return (

        <section className={styles.newsContent}>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h2>{singleNews.title}</h2>
                        <div className={styles.catDate}>
                            <div className={styles.category}>
                                <Link href={`/${singleNews.catUrl}/${singleNews.subCatUrl}`}>{singleNews.sub_category}</Link>
                            </div>
                            <div className={styles.date}>
                            <span><i className="icon-calendar-empty"></i>{convertDateUTC(singleNews.date)} <span>&#x2B1D;</span> {convertTimeUTC(singleNews.date)}</span>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.image}>
                                <Image src={singleNews.img} width={850} height={530} alt={singleNews.title} />
                            </div>
                            <div dangerouslySetInnerHTML={
                                {
                                    __html: singleNews.text
                                }}>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <LatestNews news={latestNews} />
                        {
                            console.log(latestNews)
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SingleNews