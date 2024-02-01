'use client'
import styles from "./addNews.module.scss"
import { useEffect, useState } from "react"

const AddNews = ({ categories, data, newsType }) => {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [subCategory, setSubCategory] = useState([])

    const getSelectCat = (e) => {
        setSelectedCategory(e.target.value)
    }
    console.log(newsType);
    useEffect(() => {
        const subCat = data.filter(item => {
            return item.cat === selectedCategory
        })
        console.log(subCat);
        setSubCategory(subCat)
    }, [selectedCategory])



    return (
        <section className={styles.addNews}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.title}>
                            <h2>Xəbər əlavə et</h2>
                        </div>
                        <form className={styles.formContent}>
                            <input type="text" name="news-title" placeholder="Xəbər başlığı" />
                            <select name="category" id="category" onChange={getSelectCat}>
                                <option value="select">- Kateqoriya -</option>
                                {
                                    categories.map(item => <option key={item.id} value={item.cat}>{item.cat}</option>)
                                }
                            </select>

                            <select name="sub-category" id="sub-category">
                                <option value="select">- Alt kateqoriya -</option>
                                {
                                    subCategory.map(item => <option key={item.id} value={item.sub_cat}>{item.sub_cat}</option>)
                                }
                            </select>
                            <select name="news-type" id="news-type">
                                <option value="select">- Xəbər tipi -</option>
                                {
                                    newsType.map(item => <option key={item.id} value={item.namet}>{item.name}</option>)
                                }
                            </select>
                            <div className={styles.check}>
                                <input type="checkbox" name="slider" id="slider" />
                                <label htmlFor="slider">Əsas slayt</label>
                                <input type="checkbox" name="urgent" id="urgent" />
                                <label htmlFor="urgent">Təcili xəbər</label>
                                <input type="checkbox" name="important" id="important" />
                                <label htmlFor="important">Vacib xəbər</label>
                                <input type="checkbox" name="paid-news" id="paid-news" />
                                <label htmlFor="important">Ödənişli xəbər</label>
                            </div>
                            <label htmlFor="title-img">Başlıq foto</label>
                            <input type="file" name="title-img" id="title-img" hidden />
                            <label htmlFor="news-galery">Galareya fotosu</label>
                            <input type="file" name="news-galery" id="news-galery" multiple hidden/>
                            <label htmlFor="video">Video yüklə</label>
                            <input type="file" name="video" id="video" hidden />
                            <textarea name="news-content" id="news-content" cols="30" rows="10"></textarea>
                            <button type="submit">Əlavə et</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddNews