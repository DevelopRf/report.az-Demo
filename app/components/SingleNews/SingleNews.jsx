'use client'
import styles from "./SingleNews.module.scss"
import LatestNews from "../LatestNews/LatestNews"
import Image from "next/image"
import Link from "next/link"
import { convertToJSON } from "@/app/libs/newsData"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"

const SingleNews = ({ singleNews, latestNews }) => {
    return (

        <section className={styles.newsContent}>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h1>{singleNews.title}</h1>
                        <div className={`${styles.catDate} ${singleNews.sub_category === "" && styles.empty}`}>
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
                                    __html: convertToJSON(singleNews.text)
                                }}>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <div className={styles.icon}>
                                <Link href="https://www.whatsapp.com/channel/0029VaAQDGG1NCrLqDCPr31x"><i className="icon-whatsapp"></i></Link>
                            </div>

                            <div className={styles.text}>
                                <Link href="https://www.whatsapp.com/channel/0029VaAQDGG1NCrLqDCPr31x">Bizim WhatsApp kanalımıza abunə olun</Link>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.shareAuthor}>
                            <ul className={styles.shareIcons}>
                                <li><Link href="#"><i className="icon-facebook"></i></Link></li>
                                <li><Link href="#"><i className="icon-whatsapp"></i></Link></li>
                                <li><Link href="#"><i className="icon-telegram"></i></Link></li>
                                <li><Link href="#"><i className="icon-twitter"></i></Link></li>
                                <li><Link href="#"><i className="icon-print"></i></Link></li>
                                <li><Link href="#"><i className="icon-link"></i></Link></li>
                            </ul>
                            <div className={styles.author}>
                                <div className={styles.image}>
                                    <Link href="#">
                                        <Image src={singleNews.author_img} width={38} height={38} alt={singleNews.author_name} />
                                    </Link>
                                </div>
                                <div className={styles.authorName}>
                                    <Link href="#">{singleNews.author_name}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <LatestNews news={latestNews} />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SingleNews