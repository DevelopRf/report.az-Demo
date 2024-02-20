'use client'
import styles from "./addNews.module.scss"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { HookContext } from "@/app/Hooks/Hook"

const AddNews = ({ categories, catData, newsType }) => {

    const [subCategories, setSubCategories] = useState([])
    const [catValue, setCatValue] = useState(null)
    const [subCatValue, setSubCatValue] = useState(null)
    const [catUrlValue, setCatUrlValue] = useState("")
    const [subCatUrlValue, setSubCatUrlValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [newsTypeValue, setnewsTypeValue] = useState("")
    const [textValue, setTextValue] = useState("")

    const { update, setUpdate, data, setData } = useContext(HookContext)


    const d = new Date()


    const getSelectCat = (e) => {
        setCatValue(e.target.value)
    }

    const getSelectedSubCat = (e) => {
        setSubCatValue(e.target.value)
    }

    const getNewsType = (e) => {
        setnewsTypeValue(e.target.value)
    }

    useEffect(() => {
        const subCats = catData.filter(item => item.cat === catValue)
        setSubCategories(subCats)

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

    const submitForm = (e) => {
        e.preventDefault()
        let data = { title: titleValue, category: catValue, catUrl: catUrlValue, sub_category: subCatValue, subCatUrl: subCatUrlValue, type: newsTypeValue, date: d.toISOString(), img: "https://static.report.az/photo/4cf5a75a-b4f6-3de9-9917-6cbc228f13c9_850.jpg", photo: false, photo_src: [], video: false, video_src: [], paid_info: false, slider: false, urgent: false, important: false, text: textValue }
        if (!update) {
            fetch("http://localhost:1100/news", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
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
                                <input type="text" name="news-title" placeholder="Xəbər başlığı" onChange={getTitleValue} />
                            </div>
                            <div className="col-6 p-x gy-3">
                                <select name="category" id="category" onChange={getSelectCat}>
                                    <option value="select">- Kateqoriya -</option>
                                    {
                                        categories.map(item => <option key={item.id} value={item.cat}>{item.cat}</option>)
                                    }
                                </select>

                                <select name="sub-category" id="sub-category" onChange={getSelectedSubCat}>
                                    <option value="select">- Alt kateqoriya -</option>
                                    {
                                        subCategories.map(item => <option key={item.id} value={item.sub_cat}>{item.sub_cat}</option>)
                                    }
                                </select>

                                <select name="news-type" id="news-type" onChange={getNewsType}>
                                    <option value="select">- Xəbər tipi -</option>
                                    {
                                        newsType.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-6 p-x gy-3 d-flex justify-content-end align-items-center">
                                <label htmlFor="slider" className={styles.checkBox}>Əsas slayt
                                    <input type="checkbox" name="slider" id="slider" />
                                    <span></span>
                                </label>
                                <label htmlFor="urgent" className={styles.checkBox}>Təcili xəbər
                                    <input type="checkbox" name="urgent" id="urgent" />
                                    <span></span>
                                </label>
                                <label htmlFor="important" className={styles.checkBox}>Vacib xəbər
                                    <input type="checkbox" name="important" id="important" />
                                    <span></span>
                                </label>
                                <label htmlFor="paid-news" className={styles.checkBox}>Ödənişli xəbər
                                    <input type="checkbox" name="paid-news" id="paid-news" />
                                    <span></span>
                                </label>
                            </div>

                            <div className="col-12 p-x gy-3 d-flex justify-content-end">
                                <label htmlFor="title-img" className={styles.file}>Başlıq foto</label>
                                <input type="file" name="title-img" id="title-img" hidden />
                                <label htmlFor="news-galery" className={styles.file}>Galareya fotosu</label>
                                <input type="file" name="news-galery" id="news-galery" multiple hidden />
                                <label htmlFor="video" className={styles.file}>Video yüklə</label>
                                <input type="file" name="video" id="video" hidden />
                            </div>
                            <div className="col-12 p-x gy-3">
                                <textarea name="news-content" id="news-content" placeholder="Xəbərin məzmununu daxil edin" cols="30" rows="10" onChange={getTextValue}></textarea>
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