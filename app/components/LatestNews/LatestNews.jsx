import Link from "next/link"
import styles from "./LatestNews.module.scss"
import localFont from "next/font/local"
import { convertTimeUTC } from "@/app/libs/date"
import "../../styles/fontello/css/fontello.css"

const MontserratExtraBold = localFont({ src: '../../fonts/Montserrat-ExtraBold.woff2' })
const MontserratMedium = localFont({ src: '../../fonts/Montserrat-Medium.woff2' })

const LatestNews = ({ news }) => {

    return (
        <section className={styles.latestNews}>
            <div className={styles.wrapper}>
                <div className={`${styles.title} ${MontserratExtraBold.className}`}>
                    <h2><Link href="#">Son xəbərlər</Link></h2>
                </div>
                <div className={`${styles.contentWrapper} ${MontserratMedium.className}`}>
                    {
                        news && news.slice(0, 20).map(item => {
                            return (

                                <div key={item.id} className={`${styles.content} ${item.urgent && styles.urgent} ${item.important && styles.important}`}>
                                    <div className={styles.time}>
                                        <span>{convertTimeUTC(item.date)}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.newsTitle}>
                                            <Link href="#">{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                        </div>
                                        <div className={styles.category}>
                                            <Link href="#">{item.sub_category}</Link>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
                </div>
                <div className={styles.btnAllNews}>
                    <Link href={`latest`}>BÜTÜN XƏBƏR LENTİ</Link>
                </div>
            </div>
        </section>
    )
}

export default LatestNews