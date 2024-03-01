'use client'
import styles from "./addNews.module.scss"
import { useEffect, useState } from "react"
import { useAppContext } from "@/app/Hooks/Hook"
import { convertChars } from "@/app/libs/newsData"
import { convertToJSON } from "@/app/libs/newsData"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const AddNews = ({ categories, catData, newsType }) => {
    const refTitle = useRef()
    const refImage = useRef()
    const refCat = useRef()
    const refSubCat = useRef()
    const refType = useRef()
    const refSlide = useRef()
    const refUrgent = useRef()
    const refImportant = useRef()
    const refPaidInfo = useRef()
    const refText = useRef()
    const router = useRouter();
    const [data, setData] = useState(null)
    const [subCategories, setSubCategories] = useState([])
    const [catValue, setCatValue] = useState(null)
    const [status, setStatus] = useState(false)
    const { update, newsId, author } = useAppContext()

    const d = new Date()

    useEffect(() => {
        const onload = async () => {
            if (update) {
                const res = await fetch(`http://localhost:1100/news/${newsId}`)
                try {
                    if (!res.ok) {
                        throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
                    }
                    const data = await res.json()
                    setData(data)


                } catch (error) {
                    console.error("Xəta baş verdi", error)
                    throw error
                }
            }
        }
        onload()
    }, [])


    const getSelectedCat = (e) => {
        setCatValue(e.target.value)
    }


    useEffect(() => {
        if (data) {
            refTitle.current.value = data.title
            refCat.current.value = data.category
            refSubCat.current.value = data.sub_category !=="" ? data.sub_category : "select"
            refType.current.value = data.type
            refImage.current.value = data.img
            refSlide.current.checked = data.slider
            refUrgent.current.checked = data.urgent
            refImportant.current.checked = data.important
            refPaidInfo.current.checked = data.paid_info
            refText.current.value = data.text
        }
    }, [data])

    useEffect(() => {
        const subCats = catData.filter(item => item.cat === refCat.current.value && item.sub_cat !== "")
        setSubCategories(subCats)
        subCats && subCats.length > 0 ? setStatus(false) : setStatus(true)
    }, [catValue, data])


    const submitForm = (e) => {
        e.preventDefault()
        status && (refSubCat.current.value = "")
        let data = { title: refTitle.current.value, category: refCat.current.value, catUrl: convertChars(refCat.current.value), sub_category: refSubCat.current.value, subCatUrl: convertChars(refSubCat.current.value), type: refType.current.value, date: d.toISOString(), img: refImage.current.value, photo: false, photo_src: [], video: false, video_src: [], paid_info: refPaidInfo.current.checked, slider: refSlide.current.checked, urgent: refUrgent.current.checked, important: refImportant.current.checked, author_name:author.name, author_img: author.image, text: refText.current.value }
        if (!update) {
            const addQuestion = window.confirm("Xəbər əlavə olunsun?")
            if (addQuestion) {
                fetch("http://localhost:1100/news", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                router.push("/son-xeberler")
                    router.refresh()
            }
            else return
        }
        else {
            const updateWarning = window.confirm("Dəyişikliklər qeydə alınsın?")
            if (updateWarning) {
                fetch(`http://localhost:1100/news/${newsId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                router.push("/son-xeberler")
                router.refresh()
            }
            else return
        }
    }



    return (
        <section className={styles.addNews}>
            <div className="container">
                <div className="row">
                    <div className="col-12 p-x">
                        <div className={styles.title}>
                            <h2>Xəbər əlavə et</h2>
                        </div>
                    </div>
                    <form className={styles.formContent} onSubmit={submitForm}>
                        <div className="row">
                            <div className="col-12 p-x gy-3">
                                <input ref={refTitle} type="text" name="news-title" placeholder="Xəbər başlığı" />
                                <input ref={refImage} type="text" name="photo" placeholder="Foto linki" />
                            </div>
                            <div className="col-6 p-x gy-3">
                                <select name="category" id="category" ref={refCat} onChange={getSelectedCat}>
                                    <option value="select">- Kateqoriya -</option>
                                    {
                                        categories.map(item => <option key={item.id} value={item.cat}>{item.cat}</option>)
                                    }
                                </select>

                                <select name="sub-category" id="sub-category" ref={refSubCat} disabled={status}>
                                    <option value="select">- Alt kateqoriya -</option>
                                    {
                                        subCategories.map(item => <option key={item.id} value={item.sub_cat}>{item.sub_cat}</option>)
                                    }
                                </select>

                                <select name="news-type" id="news-type" ref={refType} >
                                    <option value="select">- Xəbər tipi -</option>
                                    {
                                        newsType.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-6 p-x gy-3 d-flex justify-content-end align-items-center">
                                <label htmlFor="slider" className={styles.checkBox}>Əsas slayt
                                    <input type="checkbox" name="slider" ref={refSlide} id="slider" />
                                    <span></span>
                                </label>
                                <label htmlFor="urgent" className={styles.checkBox}>Təcili xəbər
                                    <input type="checkbox" name="urgent" ref={refUrgent} id="urgent" />
                                    <span></span>
                                </label>
                                <label htmlFor="important" className={styles.checkBox}>Vacib xəbər
                                    <input type="checkbox" name="important" ref={refImportant} id="important" />
                                    <span></span>
                                </label>
                                <label htmlFor="paid-news" className={styles.checkBox}>Ödənişli xəbər
                                    <input type="checkbox" name="paid-news" ref={refPaidInfo} id="paid-news" />
                                    <span></span>
                                </label>
                            </div>
                            <div className="col-12 p-x gy-3">
                                <textarea name="news-content" ref={refText} id="news-content" placeholder="Xəbərin məzmununu daxil edin" cols="30" rows="10"></textarea>
                            </div>
                        </div>

                        <div className={styles.btn}>
                            <button type="submit">Əlavə et</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddNews