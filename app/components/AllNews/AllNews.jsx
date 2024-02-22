'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./AllNews.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import { useEffect, useState } from "react"
import "../../styles/fontello/css/fontello.css"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/Hooks/Hook"

const AllNews = ({ news }) => {
    const { setUpdate, setNewsId } = useAppContext()
    const [newsCount, setNewsCount] = useState(20)
    const [edit, setEdit] = useState(null)
    const router = useRouter()
    const handleClick = (index) => {
        if (edit === index) {
            return setEdit(null)
        }
        setEdit(index)
    }

    const scroll = () => {
        if (innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setNewsCount(newsItem => newsItem + 20)
        }
    }

    const updateNews = (id) => {
        setUpdate(true)
        setNewsId(id)
    }

    const deleteNews = async (newsId) => {
        try {
            const res = await fetch(`http://localhost:1100/news/${newsId}`, {
                method: "DELETE"
            })
            if (res.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Xəta baş verdi', error)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scroll)
    })

    return (
        <section className={styles.categories}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.wrapper}>
                            <div className={styles.title}>
                                <h1>Son xəbərlər</h1>
                                <div className={styles.addNews}>
                                    <Link href={`/addnews`}>Xəbər əlavə et</Link>
                                </div>
                            </div>
                            <ul className={styles.filter}>
                                <li><Link href="/son-xeberler/bu-gun">BU GÜN</Link></li>
                                <li><Link href="/son-xeberler/dunen">DÜNƏN</Link></li>
                                <li><Link href="/son-xeberler/bu-hefte">BU HƏFTƏ</Link></li>
                                <li><Link href="/son-xeberler/bu-ay">BU AY</Link></li>
                                <li><Link href="/son-xeberler/kecen-hefte">KEÇƏN HƏFTƏ</Link></li>
                                <li><Link href="/son-xeberler/kecen-ay">KEÇƏN AY</Link></li>
                            </ul>

                            <div className={styles.contentWrapper}>
                                {
                                    news && news.slice(0, newsCount).map((item, index) => {
                                        return (
                                            <div key={item.id} className={`${styles.content} ${item.urgent && styles.urgent} ${item.important && styles.important}`}>
                                                <div className={styles.image}>
                                                    <Link href="">
                                                        <Image src={item.img}
                                                            width={180}
                                                            height={106}
                                                            alt={item.title}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.newsTitle}>
                                                        <Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                                    </div>
                                                    <div className={styles.date}>
                                                        <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                                    </div>
                                                </div>
                                                <ul className={`${styles.edit} ${edit === index ? styles.active : ""}`}>
                                                    <li>
                                                        <button onClick={() => handleClick(index)}><i className="icon-th-list"></i></button>
                                                    </li>
                                                    <li>
                                                        <Link href={"/addnews"} onClick={() => updateNews(item.id)}><i className="icon-arrows-ccw"></i></Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => deleteNews(item.id)}><i className="icon-trash-empty"></i></button>
                                                    </li>
                                                </ul>
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

export default AllNews