'use client'
import styles from "./addNews.module.scss"
import { useEffect, useState } from "react"
import { useAppContext } from "@/app/Hooks/Hook"
import { convertChars } from "@/app/libs/newsData"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { toast } from 'react-toastify';

const AddNews = ({ categories, catData, newsType, userInfo, count }) => {
    const { update, newsId } = useAppContext()

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
    const router = useRouter()
    const [data, setData] = useState(null)
    const [subCategories, setSubCategories] = useState([])
    const [catValue, setCatValue] = useState(null)
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState(false)
    const [check, setCheck] = useState(false)
    const [dataCount, setDataCount] = useState(5 - count.length)
    const [initialLoad, setInitialLoad] = useState(true);
    const [disable, setDisable] = useState(false)
    const [warning, setWarning] = useState(false)

    const refs = {
        refTitle,
        refImage,
        refText,
        refCat,
        refSubCat,
        refType
    }


    const activeClass = (element) => element.classList.add(styles.active)

    const removeActiveClass = (element) => element.classList.remove(styles.active)

    const user = typeof sessionStorage !== 'undefined' && userInfo && userInfo.find(item => item.id === sessionStorage.getItem("usr"))


    const d = new Date()

    const checkControl = () => {
        setCheck(!check)
    }

    useEffect(() => {
        if (initialLoad) {
            return
        }
        const sliderCount = 5 - count.length
        if (sliderCount > 0) {
            refSlide.current.checked ? setDataCount(sliderCount - 1) : setDataCount(sliderCount)
        }
        else {
            setDisable(true)
        }

        if (data && data.slider) {
            !refSlide.current.checked ? setDataCount(sliderCount + 1) : setDataCount(sliderCount)
        }
    }, [check, data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!update) {
            dataCount === 0 ? setDisable(true) : setDisable(false)
        }
        else {
            if (data) {
                !data.slider && dataCount === 0 ? setDisable(true) : setDisable(false)
            }
        }
    }, [disable, data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dataCount > 0 ? setWarning(false) : setWarning(true)

    }, [warning, dataCount])

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false)
        }
    }, [initialLoad])

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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const sliderOnClick = () => {
        disable && toast.warning('5-dən çox xəbər slaytı yerləşdirə bilməzsiniz. Yeni xəbər slaytı əlavə etmək üçün slayt-da görsənməsini istəmədiyiniz xəbərin redəktə bölməsinə gedin və "Əsas slayt" qarşısındakı işarəni götürün. Bundan sonra yeni slayt əlavə edə bilərsiniz.')

    }

    const getSelectedCat = (e) => {
        setCatValue(e.target.value)
    }

    const handleInput = () => {
        Object.values(refs).forEach((ref) => {
            const element = ref.current
            removeActiveClass(element)
        })
        setMessage(false)
    }

    const handleChange = (e) => {
        getSelectedCat(e);
        handleInput()
    }

    useEffect(() => {
        if (data && update) {
            refTitle.current.value = data.title
            refCat.current.value = data.category
            refSubCat.current.value = data.sub_category !== "" ? data.sub_category : "all"
            refType.current.value = data.type
            refImage.current.value = data.img
            setCheck(data.slider)
            refUrgent.current.checked = data.urgent
            refImportant.current.checked = data.important
            refPaidInfo.current.checked = data.paid_info
            refText.current.value = data.text
        }
    }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const subCats = catData.filter(item => item.cat === refCat.current.value && item.sub_cat !== "")
        setSubCategories(subCats)
        subCats && subCats.length > 0 ? setStatus(false) : setStatus(true)
    }, [catValue, data])

    const submitForm = (e) => {
        e.preventDefault()
        let data = { title: refTitle.current.value, category: refCat.current.value, catUrl: convertChars(refCat.current.value), sub_category: status ? "" : refSubCat.current.value, subCatUrl: convertChars(refSubCat.current.value), type: refType.current.value, date: d.toISOString(), img: refImage.current.value, photo: false, photo_src: [], video: false, video_src: [], paid_info: refPaidInfo.current.checked, slider: refSlide.current.checked, urgent: refUrgent.current.checked, important: refImportant.current.checked, user_id: user.id, text: refText.current.value }

        if (!refTitle.current.value) activeClass(refTitle.current)
        if (!refImage.current.value) activeClass(refImage.current)
        if (refCat.current.value === "all") activeClass(refCat.current)
        if (!status && refSubCat.current.value === "all") activeClass(refSubCat.current)
        if (refType.current.value === "all") activeClass(refType.current)
        if (!refText.current.value) activeClass(refText.current)

        if (!refTitle.current.value || !refImage.current.value || refCat.current.value === "all" || !status && refSubCat.current.value === "all" || refType.current.value === "all" || !refText.current.value) {
            toast.error("Boş qalan bölmələri doldurun")
        }
        else {
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
                    toast.success("Xəbər uğurla əlavə edildi")
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
                    toast.success("Xəbər uğurla yeniləndi")
                    router.refresh()
                }
                else return
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
                </div>

                <form className={styles.formContent} onSubmit={submitForm}>

                    <div className="row">
                        <div className="col-12 p-x gy-4">
                            <input ref={refTitle} type="text" name="news-title" placeholder="Xəbər başlığı" onChange={handleInput} />
                        </div>
                        <div className="col-12 p-x gy-4">
                            <input ref={refImage} type="text" name="photo" placeholder="Foto linki" onInput={handleInput} />
                        </div>
                        <div className="col-12 col-xl-6 p-x gy-4 d-flex flex-wrap gap-3">
                            <select name="category" id="category" ref={refCat} onChange={handleChange}>
                                <option value="all">- Kateqoriya -</option>
                                {
                                    categories.map(item => <option key={item.id} value={item.cat}>{item.cat}</option>)
                                }
                            </select>

                            <select name="sub-category" id="sub-category" ref={refSubCat} disabled={status} onChange={handleInput}>
                                <option value="all">- Alt kateqoriya -</option>
                                {
                                    subCategories.map(item => <option key={item.id} value={item.sub_cat}>{item.sub_cat}</option>)
                                }
                            </select>
                            <select name="news-type" id="news-type" ref={refType} onChange={handleInput}>
                                <option value="all">- Xəbər tipi -</option>
                                {
                                    newsType.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-12 col-xl-6 p-x gy-4 d-flex flex-wrap row-gap-2 justify-content-end align-items-center">
                            <label htmlFor="slider" className={styles.checkBox} onClick={sliderOnClick}>Əsas slayt
                                <input type="checkbox" name="slider" ref={refSlide} id="slider" disabled={disable} checked={check} onChange={checkControl} />
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
                        <div className="col-12 p-x gy-4">
                            <p className={`${styles.count} ${warning ? styles.active : ""}`}>Maksimum yerləşdiriləcək slider sayı:<span>{dataCount}</span></p>
                        </div>
                        <div className="col-12 p-x gy-4">
                            <div className={styles.info}>
                                <p><span>*</span> Qaın yazı üçün söz və ya mətnin əvvəl və sonuna <span>&nbsp;*b&nbsp;</span> yazmaq lazımdır</p>
                                <p><span>*</span> Maili yazı üçün söz və ya mətnin əvvəl və sonuna <span>&nbsp;*i&nbsp;</span> yazmaq lazımdır</p>
                                <p><span>*</span> Yazının maili və qalın olması üçün söz və ya mətnin əvvəl və sonuna <span>&nbsp;*bi&nbsp;</span> yazmaq lazımdır</p>
                            </div>
                        </div>
                        <div className="col-12 p-x gy-4">
                            <textarea name="news-content" ref={refText} id="news-content" placeholder="Xəbərin məzmununu daxil edin" cols="30" rows="10" onInput={handleInput}></textarea>
                        </div>
                    </div>

                    <div className={styles.btn}>
                        <button type="submit">Əlavə et</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default AddNews