'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./AllNews.module.scss"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"
import { use, useEffect, useRef, useState } from "react"
import "../../styles/fontello/css/fontello.css"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/Hooks/Hook"

const AllNews = ({ news }) => {
    const { setUpdate, setNewsId, author, setAuthor } = useAppContext()
    const [newsCount, setNewsCount] = useState(20)
    const [edit, setEdit] = useState(null)
    const router = useRouter()
    const refEdit = useRef()
    const username = useRef()
    const password = useRef()
    const [userData, setUserData] = useState(null)
    const message = useRef()
    const [modal, setModal] = useState(false)


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

    useEffect(() => {
        const login = async () => {
            const user = await fetch("http://localhost:1100/users")
            try {
                if (!user.ok) {
                    throw new Error(`Məlumat əldə edilə bilmədi. Status: ${user.status}`)
                }
                const data = await user.json()
                setUserData(data)
            } catch (error) {
                console.error("Xəta baş verdi", error)
                throw error
            }
        }
        login()
    }, [])

    const userControl = () => {
        const user = userData && userData.find(item => item.user_name === username.current.value && item.password === password.current.value)
        user ? setAuthor({name: user.author_name, image: user.author_img}) || router.push("/addnews") : message.current.innerText = "İstifadəçi adı və ya parol yalnışdır!"
        username.current.value = ""
        password.current.value = ""
    }

    useEffect(()=>{
        console.log(author.name);
    }, [author])

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
        window.addEventListener("scroll", scroll)
    }, [])

    return (
        <section className={styles.categories}>
            <div className="container">
                <div className={`${styles.overlay} ${modal ? styles.active : ""}`}>
                    <div className={styles.modal}>
                        <div className={styles.close} onClick={() => setModal(false)}>
                            <i className="icon-cancel"></i>
                        </div>
                        <div className={styles.title}>
                            <h2>Portala Giriş</h2>
                        </div>
                        <form>
                            <input type="text" name="login" placeholder="İstifadəçi adı" ref={username} />
                            <input type="password" name="password" placeholder="password" ref={password} />
                            <span ref={message}></span>
                            <button type="button" onClick={userControl}>Daxil ol</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-x">
                        <div className={styles.wrapper}>
                            <div className={styles.title}>
                                <h1>Son xəbərlər</h1>
                                <div className={styles.addNews}>
                                    <button onClick={() => setModal(true)}>Xəbər əlavə et</button>
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
                                                    <Link href={`/${item.subCatUrl !== "" ? item.subCatUrl : item.catUrl}/${item.id}`}>
                                                        <Image src={item.img}
                                                            width={180}
                                                            height={106}
                                                            alt={item.title}
                                                        />
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
                                                <ul className={`${styles.edit} ${edit === index ? styles.active : ""}`} ref={refEdit}>
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