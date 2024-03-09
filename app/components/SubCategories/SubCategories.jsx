'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./SubCategories.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import { useState, useEffect } from "react"
import { useAppContext } from "@/app/Hooks/Hook"
import NotFound from "../NotFound/NotFound"

const SubCategories = ({ news, categoryName, subCats, author }) => {
    const { setUpdate, setNewsId, } = useAppContext()

    const [data, setData] = useState(null)
    const [authorNews, setAuthorNews] = useState(null)
    const [authorPage, setAuthorPage] = useState(false)
    const [edit, setEdit] = useState(null)

    const handleClick = (index) => {
        if (edit === index) {
            return setEdit(null)
        }
        setEdit(index)
    }

    const updateNews = (id) => {
        setUpdate(true)
        setNewsId(id)
    }

    const deleteNews = (newsId) => {
        const deleteWarning = window.confirm("Xəbər silinəcək. Əminsiniz?")
        if (deleteWarning) {
            fetch(`http://localhost:1100/news/${newsId}`, {
                method: "DELETE"
            })
            router.refresh()
            setEdit(null)
        }
        else return
    }

    useEffect(() => {
        const user = sessionStorage.getItem("usr")
        const authorNews = author && user && author.filter(item => item.user_id === user)
        setAuthorNews(authorNews)
    }, [author])

    useEffect(() => {
        authorNews ? setData(authorNews) || setAuthorPage(true) : setData(news) || setAuthorPage(false)
    }, [authorNews, authorPage])

    return (
        <main>
            <section className={styles.newsCategory}>
                <div className="container p-x">
                    <div className={styles.title}><h1>{categoryName}</h1></div>
                    {
                        subCats && subCats.find(item => item.subCat !== "") &&
                        <ul className={styles.filter}>
                            {
                                subCats.map(item => <li key={item.id}><Link href={`/${item.subCatUrl}`}>{item.subCat}</Link></li>)
                            }
                        </ul>
                    }
                    <div className="row">
                        {
                            data && data.map((item, index) => {
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 p-x mb-5" key={item.id}>
                                        <div className={styles.card}>
                                            <div className={styles.image}>
                                                <Link href={`/${item.subCatUrl !== "" ? item.subCatUrl : item.catUrl}/${item.id}`}><Image src={item.img} width={290} height={205} alt={item.title} priority={true} />
                                                    <div className={`${styles.overlay} ${item.user_id !== sessionStorage.getItem("usr") ? styles.active : ""}`}></div>
                                                </Link>

                                            </div>
                                            <div className={styles.info}>
                                                <div className={styles.newsTitle}>
                                                    <Link href={`/${item.subCatUrl !== "" ? item.subCatUrl : item.catUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                                </div>
                                                <div className={styles.date}>
                                                    <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                                </div>
                                            </div>
                                            <ul className={`${styles.edit} ${edit === index ? styles.active : ""} ${item.user_id !== sessionStorage.getItem("usr") ? styles.notUser : ""}`}>
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