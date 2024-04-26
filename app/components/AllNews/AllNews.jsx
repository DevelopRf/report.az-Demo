'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./AllNews.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import { useEffect, useRef, useState } from "react"
import "../../styles/fontello/css/fontello.css"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/Hooks/Hook"
import NotFound from "../NotFound/NotFound"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const AllNews = ({ news, searchNews }) => {
    const { searchValue, login, setUpdate } = useAppContext()
    const [newsCount, setNewsCount] = useState(20)
    const [edit, setEdit] = useState(null)
    const router = useRouter()
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState(false)


    const scroll = () => {
        if (innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setNewsCount(newsItem => newsItem + 20)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scroll)
    }, [])

    useEffect(() => {
        const filterSearch = searchValue && searchNews && searchNews.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        searchNews && setFilter(filterSearch)
    }, [searchValue, searchNews])

    useEffect(() => {
        filter ? setData(filter) : setData(news)
    }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className={styles.allNews}>
            <div className="container">
                <div className="row">
                    <div className="col-12 p-x">
                        <div className={styles.wrapper}>
                            <div className={`${styles.title} ${!searchValue && searchNews ? styles.active : ""}`}>
                                <h1>{`${searchNews ? `Açar sözü: ${searchValue}` : "Son xəbərlər"}`}</h1>
                                <div className={`${styles.addNews} ${searchNews || !login ? styles.active : ""}`}>
                                    <button onClick={() => { router.push("/addnews") || setUpdate(false) }}>Xəbər əlavə et</button>
                                </div>
                            </div>
                            <ul className={`${styles.filter} ${searchNews ? styles.active : ""}`}>
                                <li><Link href="/son-xeberler/bu-gun">BU GÜN</Link></li>
                                <li><Link href="/son-xeberler/dunen">DÜNƏN</Link></li>
                                <li><Link href="/son-xeberler/bu-hefte">BU HƏFTƏ</Link></li>
                                <li><Link href="/son-xeberler/bu-ay">BU AY</Link></li>
                                <li><Link href="/son-xeberler/kecen-hefte">KEÇƏN HƏFTƏ</Link></li>
                                <li><Link href="/son-xeberler/kecen-ay">KEÇƏN AY</Link></li>
                            </ul>

                            <div className={styles.contentWrapper}>
                                {
                                    data ? data.slice(0, newsCount).map((item, index) => {
                                        return (
                                            <div key={item.id} className={`${styles.content} ${item.urgent && styles.urgent} ${item.important && styles.important}`}>
                                                <div className={styles.image}>
                                                    <Link href={`//${item.subCatUrl ? item.subCatUrl : item.catUrl}/${item.id}`}>
                                                        <Image src={item.img}
                                                            width={180}
                                                            height={106}
                                                            alt={item.title}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.newsTitle}>
                                                        <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                                    </div>
                                                    <div className={styles.date}>
                                                        <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <LoadingSpinner />
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles.errorTitle}>
                    <h2>{data && data.length === 0 && `Axtarışa uyğun nəticə tapılmadı`}</h2>
                </div>
            </div>
            {!searchValue && searchNews && <NotFound />}
        </section>
    )
}

export default AllNews