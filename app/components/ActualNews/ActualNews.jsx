import styles from "./ActualNews.module.scss"
import Image from "next/image"
import localFont from "next/font/local"
import Link from "next/link"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"

const MontserratMedium = localFont({ src: "../../fonts/Montserrat-Medium.woff2" })
const ActualNews = ({ news }) => {
    
    return (
        <section className={styles.actualNews}>
            <div className={styles.wrapper}>
                <div className={styles.cards}>
                    {
                        news && news.slice(0, 2).map(item => {
                            return (
                                <div key={item.id} className={styles.bigCard}>
                                    <div className={styles.image}>
                                        <Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}><Image src={item.img} width={180} height={106} alt={item.title} /></Link>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.category}>
                                            <Link href={`${item.catUrl}/${item.subCatUrl}`}>{item.sub_category}</Link>
                                        </div>
                                        <div className={styles.newsTitle}>
                                            <Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.title}</Link>
                                        </div>
                                        <div className={styles.date}>
                                            <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        news && news.slice(0, 14).map(item => {
                            return (
                                <div key={item.id} className={styles.card}>
                                    <div className={styles.image}>
                                        <Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}><Image src={item.img} width={180} height={106} alt={item.title} /></Link>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.newsTitle}>
                                            <Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title.length > 75 ? `${item.title.slice(0, 75)}...` : `${item.title}`}{item.paid_info && <span className="iconLock"></span>}</Link>
                                        </div>
                                        <div className={styles.date}>
                                            <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default ActualNews