'use client'
import styles from "./addNews.module.scss"
import { useEffect, useState } from "react"
import { useAppContext } from "@/app/Hooks/Hook"
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
    const [subCategories, setSubCategories] = useState([])
    const [catValue, setCatValue] = useState(null)
    const [subCatValue, setSubCatValue] = useState([])
    const [catUrlValue, setCatUrlValue] = useState("")
    const [subCatUrlValue, setSubCatUrlValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [newsTypeValue, setnewsTypeValue] = useState("")
    const [textValue, setTextValue] = useState("")
    const [image, setImage] = useState("")
    const [slider, setSlider] = useState(false)
    const [urgent, setUrgent] = useState(false)
    const [important, setImportant] = useState(false)
    const [paidInfo, setPaidInfo] = useState(false)
    const [status, setStatus] = useState(false)
    const { update, newsId } = useAppContext()


    const d = new Date()


    const getSelectCat = (e) => {
        setCatValue(e.target.value)
    }

    const getImage = (e) => {
        setImage(e.target.value)
    }

    const getSelectedSubCat = (e) => {
        setSubCatValue(e.target.value)
    }

    const getNewsType = (e) => {
        setnewsTypeValue(e.target.value)
    }

    const getSliderValue = () => {
        setSlider(!slider)
    }

    const getUrgentValue = () => {
        setUrgent(!urgent)
    }

    const getImportantValue = () => {
        setImportant(!important)
    }

    const getPainValue = () => {
        setPaidInfo(!paidInfo)
    }

    useEffect(() => {
        const subCats = catData.filter(item => item.cat === catValue)
        setSubCategories(subCats)
        if (subCats[0].sub_cat === "") {
            setStatus(true)
        }
        else {
            setStatus(false)
        }

        const catUrl = subCats.map(item => item.catUrl)
        setCatUrlValue([... new Set(catUrl)].toString())
    }, [catValue])

    useEffect(() => {
        const subCats = catData.filter(item => item.sub_cat === subCatValue)
        setSubCatUrlValue()
        subCats.length > 0 && setSubCatUrlValue(subCats[0].subCatUrl)
    }, [subCatValue])

    const getTitleValue = (e) => {
        setTitleValue(e.target.value)
    }

    const getTextValue = (e) => {
        setTextValue(e.target.value)
    }

    const onload = async () => {
        if (update) {
            const res = await fetch(`http://localhost:1100/news/${newsId}`)
            try {
                if (!res.ok) {
                    throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
                }
                const data = await res.json()
                refTitle.current.value = data.title
                refImage.current.value = data.img
                refCat.current.value = data.category
                refSubCat.current.value = data.sub_category
                refType.current.value = data.type
                refPaidInfo.current.checked = data.paid_info
                refSlide.current.checked = data.slider
                refUrgent.current.checked = data.urgent
                refImportant.current.checked = data.important
                refText.current.value = data.text
            } catch (error) {
                console.error("Xəta baş verdi", error)
                throw error
            }
        }
    }

    onload()

    const submitForm = async (e) => {
        e.preventDefault()
        let data = { title: titleValue, category: catValue, catUrl: catUrlValue, sub_category: subCatValue, subCatUrl: subCatUrlValue, type: newsTypeValue, date: d.toISOString(), img: image, photo: false, photo_src: [], video: false, video_src: [], paid_info: paidInfo, slider: slider, urgent: urgent, important: important, text: convertToJSON(textValue) }
        if (!update) {
            const res = await fetch("http://localhost:1100/news", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                router.push("/son-xeberler")
                router.refresh()
            }
        }
        else {
            const res = await fetch(`http://localhost:1100/news/${newsId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                router.push("/son-xeberler")
                router.refresh()
            }
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
                                <input ref={refTitle} type="text" name="news-title" placeholder="Xəbər başlığı" onChange={getTitleValue} />
                                <input ref={refImage} type="text" name="photo" placeholder="Foto linki" onChange={getImage} />
                            </div>
                            <div className="col-6 p-x gy-3">
                                <select name="category" id="category" ref={refCat} onChange={getSelectCat}>
                                    <option value="select">- Kateqoriya -</option>
                                    {
                                        categories.map(item => <option key={item.id} value={item.cat}>{item.cat}</option>)
                                    }
                                </select>

                                <select name="sub-category" id="sub-category" ref={refSubCat} onChange={getSelectedSubCat} disabled={status}>
                                    <option value="select">- Alt kateqoriya -</option>
                                    {
                                        subCategories.map(item => <option key={item.id} value={item.sub_cat}>{item.sub_cat}</option>)
                                    }
                                </select>

                                <select name="news-type" id="news-type" ref={refType} onChange={getNewsType}>
                                    <option value="select">- Xəbər tipi -</option>
                                    {
                                        newsType.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-6 p-x gy-3 d-flex justify-content-end align-items-center">
                                <label htmlFor="slider" className={styles.checkBox}>Əsas slayt
                                    <input type="checkbox" name="slider" ref={refSlide} id="slider" onChange={getSliderValue} />
                                    <span></span>
                                </label>
                                <label htmlFor="urgent" className={styles.checkBox}>Təcili xəbər
                                    <input type="checkbox" name="urgent" ref={refUrgent} id="urgent" onChange={getUrgentValue} />
                                    <span></span>
                                </label>
                                <label htmlFor="important" className={styles.checkBox}>Vacib xəbər
                                    <input type="checkbox" name="important" ref={refImportant} id="important" onChange={getImportantValue} />
                                    <span></span>
                                </label>
                                <label htmlFor="paid-news" className={styles.checkBox}>Ödənişli xəbər
                                    <input type="checkbox" name="paid-news" ref={refPaidInfo} id="paid-news" onChange={getPainValue} />
                                    <span></span>
                                </label>
                            </div>
                            <div className="col-12 p-x gy-3">
                                <textarea name="news-content" ref={refText} id="news-content" placeholder="Xəbərin məzmununu daxil edin" cols="30" rows="10" onChange={getTextValue}></textarea>
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