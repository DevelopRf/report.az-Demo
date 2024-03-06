'use client'
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/Hooks/Hook"
import styles from "./Header.module.scss"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import "../../styles/fontello/css/fontello.css"

const Header = () => {

    const { toggle, setToggle, setSearchValue, dark, setDark } = useAppContext()

    const [searchCancel, setSearchCancel] = useState(false)
    const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0)
    const [currency, setCurrency] = useState()
    const [active, setActive] = useState(null)

    const refSearch = useRef()
    const refLangs = useRef()

    const darkMode = () => {
        window.localStorage.setItem("theme", "dark Mode")
        document.body.classList.add("active");
        setDark(true);
    }
    const lightMode = () => {
        window.localStorage.removeItem("theme", "dark Mode")
        document.body.classList.remove("active");
        setDark(false);
    }

    async function getCurrency() {
        try {
            const res = await fetch(`http://localhost:1100/currency`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setCurrency(data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    useEffect(() => {
        getCurrency()
        setActive(0)
    }, [])

    useEffect(() => {
        const currencies = document.querySelectorAll(".currencies li");
        currencies.forEach((el) => {
            el.style.display = "none";
        });
    }, [currency]);

    useEffect(() => {
        const currencies = document.querySelectorAll(".currencies li");
        const totalCurrencies = currencies.length;

        const intervalId = setInterval(() => {
            currencies.forEach((el, index) => {
                const shouldBeVisible = index === currentCurrencyIndex;
                el.style.display = shouldBeVisible ? "block" : "none";
                el.style.animation = shouldBeVisible ? "currencyAnimation 0.5s linear" : "none";
            });

            setCurrentCurrencyIndex((prevIndex) => (prevIndex + 1) % totalCurrencies);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentCurrencyIndex, currency]);

    const router = useRouter()

    const handleChange = () => {
        setToggle(!toggle)
    }

    const searchBtn = () => {
        setSearchCancel(true)
        
    }

    useEffect(()=>{
       !searchCancel && console.log(refSearch.current);
    }, [searchCancel])

    const cancelBtn = () => {
        setSearchCancel(false)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.push('/xeber-axtarisi')
            setSearchValue(e.target.value.toLowerCase())
        }
    }

    const toggleLang = (index) => {
        setActive(index)
    }

    useEffect(() => {
        const overlay = document.querySelector("body .overlay")
        if (toggle) {
            overlay.classList.add("active")
            document.body.style.overflow = "hidden"
        }
        else {
            overlay.classList.remove("active")
            document.body.style.overflow = "auto"
        }
    }, [toggle])

    return (
        <header>
            <div className={styles.headerTop}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between p-x">
                            <div className={styles.left}>
                                <ul className={styles.weather}>
                                    <li><Link href="#"><Image src="https://report.az/public/images/icons/weather.png" width={18} height={19} alt="weather" /></Link></li>
                                    <li><Link href="#">Bakı 6&deg; C</Link></li>
                                    <li><Link href="#">8 m/s</Link></li>
                                </ul>
                                <Image src="https://report.az/public/images/icons/currency.png" width={19} height={19} alt="currency" />
                                <ul className="currencies">
                                    {
                                        currency && currency.map(item => <li key={item.id}><Link href="#">{`${item.name} - ${item.value}`}</Link></li>)
                                    }
                                </ul>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.staticLink}>
                                    <Link href="/haqqimizda">Haqqımızda</Link>
                                </div>
                                <ul className={styles.social}>
                                    <li><Link href="https://www.facebook.com/www.report.az/"><i className="icon-facebook"></i></Link></li>
                                    <li><Link href="https://www.instagram.com/report.az/"><i className="icon-instagram"></i></Link></li>
                                    <li><Link href="https://t.me/reportnewsaz"><i className="icon-telegram"></i></Link></li>
                                    <li><Link href="https://twitter.com/reportnewsaz"><i className="icon-twitter"></i></Link></li>
                                    <li><Link href="https://www.linkedin.com/company/report-news-agency"><i className="icon-linkedin"></i></Link></li>
                                    <li><Link href="https://www.youtube.com/channel/UCPSpgPJwGhr5uB0Uui8Lj8g"><i className="icon-youtube-play"></i></Link></li>
                                </ul>
                                <div className={`${styles.theme} ${dark ? styles.active : ""}`}>
                                    <div className={styles.dark} onClick={darkMode}>
                                        <Link href="#"><i className="icon-moon-inv"></i></Link>
                                    </div>
                                    <div className={styles.light} onClick={lightMode}>
                                        <Link href="#"><i className="icon-sun-filled"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.headerBottom}>
                <div className="container p-x">
                    <div className="row">
                        <div className="col-12 p-x">
                            <div className={styles.logoLang}>
                                <ul className={styles.langs} ref={refLangs}>
                                    <li className={active === 0 ? styles.active : ""}>
                                        <Link href="#" onClick={() => toggleLang(0)}>Azərbaycan</Link>
                                    </li>
                                    <li className={active === 1 ? styles.active : ""}>
                                        <Link href="#" onClick={() => toggleLang(1)}>Русский</Link>
                                    </li>
                                    <li className={active === 2 ? styles.active : ""}>
                                        <Link href="#" onClick={() => toggleLang(2)}>English</Link>
                                    </li>
                                </ul>
                                <div className={styles.mobMenu}>
                                    <div onClick={handleChange} className={`${styles.toggleBtn} ${toggle ? styles.active : ""}`} >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className={`${styles.navbar} ${toggle ? styles.active : ""}`}>
                                        <ul>
                                            <li><Link href="/">Əsas xəbərlər</Link></li>
                                            <li><Link href="/son-xeberler" onClick={() => setSearchValue("")}>Son xəbərlər</Link></li>
                                            <li><Link href="/siyaset">Siyasət</Link></li>
                                            <li><Link href="/iqtisadiyyat">İqtisadiyyat</Link></li>
                                            <li><Link href="/cop29">COP29</Link></li>
                                            <li><Link href="/cemiyyet">Cəmiyyət</Link></li>
                                            <li><Link href="/idman">İdman</Link></li>
                                            <li><Link href="/medeniyyet">Mədəniyyət</Link></li>
                                            <li><Link href="/dunya">Dünya</Link></li>
                                            <li><Link href="/analitika">Analitika</Link></li>
                                            <li><Link href="/multimedia">Multimedia</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.logo}>
                                    <Link href="/"><Image className={styles.logo}
                                        src={dark ? `https://report.az/public/images/logo-light-az.png` : `https://report.az/public/images/logo-dark-az.png`}
                                        priority={true}
                                        width={150}
                                        height={35}
                                        alt="report.az logo"
                                    /></Link>
                                </div>
                            </div>
                            <nav className={styles.menu}>
                                <ul>
                                    <li><Link href="/">Əsas xəbərlər</Link></li>
                                    <li><Link href="/son-xeberler">Son xəbərlər</Link></li>
                                    <li><Link href="/siyaset">Siyasət</Link></li>
                                    <li><Link href="/iqtisadiyyat">İqtisadiyyat</Link></li>
                                    <li><Link href="/cop29">COP29</Link></li>
                                    <li><Link href="/cemiyyet">Cəmiyyət</Link></li>
                                    <li><Link href="/idman">İdman</Link></li>
                                    <li><Link href="/medeniyyet">Mədəniyyət</Link></li>
                                    <li><Link href="/dunya">Dünya</Link></li>
                                    <li><Link href="/analitika">Analitika</Link></li>
                                    <li><Link href="/multimedia">Multimedia</Link></li>
                                </ul>
                                <div className={`${styles.searchBox} ${searchCancel ? styles.active : ""}`}>
                                    <input type="text" placeholder="Açar sözü daxil edin" onKeyDown={handleSearch}/>
                                    <div className={styles.cancelBtn} onClick={cancelBtn}>
                                        <i className="icon-cancel"></i>
                                    </div>
                                </div>
                                <div className={styles.searchBtn} onClick={searchBtn}>
                                    <i className="icon-search"></i>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header