'use client'
import styles from "./SingleNews.module.scss"
import LatestNews from "../LatestNews/LatestNews"
import Image from "next/image"
import Link from "next/link"
import { convertToJSON } from "@/app/libs/newsData"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const SingleNews = ({ singleNews, latestNews, userInfo }) => {

    const user = userInfo.find(item => item.id === singleNews.user_id)

    return (

       singleNews ? <section className={styles.newsContent}>
            <div className="container">
                <div className="row">
                    <div className=" col-lg-8 p-x ">
                        <div className={styles.title}>
                            <h1>{singleNews.title}</h1>
                        </div>
                        <div className={`${styles.catDate} ${singleNews.sub_category === "" && styles.empty}`}>
                            <div className={styles.category}>
                                <Link href={`/${singleNews.subCatUrl}`}>{singleNews.sub_category ? singleNews.sub_category : singleNews.category}</Link>
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
                            {
                                singleNews.photo ?
                                    <div className={styles.gallery}>
                                        {
                                            singleNews.photo_src.map((item, index) => (
                                                <div className={styles.galleryImg} key={index}>
                                                    <Image src={item} width={185} height={123} alt={`${singleNews.title} galeries`} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : ""
                            }
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
                                    <Link href="/author">
                                        <Image src={user.author_img} width={38} height={38} alt={user.author_name} />
                                    </Link>
                                </div>
                                <div className={styles.authorName}>
                                    <Link href="/author">{user.author_name}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none col-lg-4 d-lg-block p-x">
                        <div className={styles.ad}></div>
                        <LatestNews news={latestNews} />
                    </div>
                </div>
            </div>
        </section> : <LoadingSpinner />

    )
}

export default SingleNews