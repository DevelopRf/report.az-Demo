'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./SubCategories.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import { HookContext } from "@/app/Hooks/Hook"
import { useContext } from "react"

const SubCategories = ({ news, categoryName, subCats }) => {

    const { toggle } = useContext(HookContext)

    return (
        <main>
            <div className={`overlay ${toggle ? `active` : ""}`}></div>
            <section className={styles.newsCategory}>
                <div className="container p-x">
                    <div className={styles.title}><h1>{categoryName}</h1></div>
                    {
                       subCats && subCats.find(item => item.subCat !=="") &&
                        <ul className={styles.filter}>
                            {
                                subCats.map(item => <li key={item.id}><Link href={`/${item.subCatUrl}`}>{item.subCat}</Link></li>)
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
                                                <Link href={`/${item.subCatUrl !=="" ? item.subCatUrl : item.catUrl}/${item.id}`}><Image src={item.img} width={290} height={205} alt={item.title} priority={true}/></Link>
                                            </div>
                                            <div className={styles.info}>
                                                <div className={styles.newsTitle}>
                                                    <Link href={`/${item.subCatUrl !=="" ? item.subCatUrl : item.catUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
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
        </main>
    )
}

export default SubCategories