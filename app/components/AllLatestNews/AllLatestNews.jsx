import Link from "next/link"
import Image from "next/image"
import styles from "./AllLatestNews.module.scss"
import { convertDateUTC } from "@/app/libs/date"
import { convertTimeUTC } from "@/app/libs/date"


const AllLatestNews = ({ news }) => {

    /* const newsCount = () => {
        a += 20;
    } */

    return (
        <section className={styles.allLatestNews}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.wrapper}>
                            <div className={styles.title}>
                                <h1>Son xəbərlər</h1>
                                <div className={styles.addNews}>
                                    <Link href={`addnews`}>Xəbər əlavə et</Link>
                                </div>
                            </div>
                            <ul className={styles.filter}>
                                <li><Link href="">BU GÜN</Link></li>
                                <li><Link href="">DÜNƏN</Link></li>
                                <li><Link href="">BU HƏFTƏ</Link></li>
                                <li><Link href="">BU AY</Link></li>
                                <li><Link href="">KEÇƏN HƏFTƏ</Link></li>
                                <li><Link href="">KEÇƏN AY</Link></li>
                            </ul>

                            <div className={styles.contentWrapper}>
                                {
                                    news && news.map(item => {
                                        return (
                                            <div key={item.id} className={`${styles.content} ${item.urgent && styles.urgent} ${item.important && styles.important}`}>
                                                <div className={styles.image}>
                                                    <Link href="">
                                                        <Image src={item.img}
                                                            width={180}
                                                            height={106}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.newsTitle}>
                                                        <Link href={`news/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllLatestNews