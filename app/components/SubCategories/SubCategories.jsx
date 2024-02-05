'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./SubCategories.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"

const SubCategories = ({ news, categoryName, subCats }) => {


    return (
        <section className={styles.newsCategory}>
            <div className="container">
                <div className={styles.title}><h1>{categoryName}</h1></div>
                {
                    subCats &&
                    <ul className={styles.filter}>
                        {
                            subCats && subCats.map(item => <li key={item.id}><Link href={`/${item.catUrl}/${item.subCatUrl}`}>{item.subCat}</Link></li>)
                        }
                    </ul>
                }
                <div className="row">
                    {
                        news && news.map(item => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 p-x mb-5" key={item.id}>
                                    <div className={styles.card}>
                                        <div className={styles.image}>
                                            <Link href={`/${item.catUrl}/${item.subCatUrl}/${item.id}`}><Image src={item.img} width={290} height={205} alt={item.title} /></Link>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.newsTitle}>
                                                <Link href={`/${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                            </div>
                                            <div className={styles.date}>
                                                <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                            </div>
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

export default SubCategories