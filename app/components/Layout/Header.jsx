'use client'
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/Hooks/Hook"
import styles from "./Header.module.scss"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { url } from "@/app/libs/newsData"
import "../../styles/fontello/css/fontello.css"
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTelegramPlane } from "react-icons/fa";

const Header = ({ userData }) => {

    const { toggle, setToggle, setSearchValue, dark, setDark, login, setLogin } = useAppContext()

    const [searchCancel, setSearchCancel] = useState(false)
    const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0)
    const [currency, setCurrency] = useState()
    const [active, setActive] = useState(null)
    const refmobSearch = useRef()
    const refSearch = useRef()
    const refLangs = useRef()
    const logUsername = useRef()
    const regisUsername = useRef()
    const logPassword = useRef()
    const regisPassword = useRef()
    const logMessage = useRef()
    const regisMessage = useRef()
    const firstLastName = useRef()
    const image = useRef()
    const [btnLogin, setBtnLogin] = useState(false)
    const [btnRegis, setBtnRegis] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const [modalLogin, setModalLLogin] = useState(false)
    const [scrolling, setScrolling] = useState(0)
    const [visibleGoUp, setVisibleGoUp] = useState(false)
    const [user, setUser] = useState()

    const refs = {
        logUsername,
        logPassword,
        regisUsername,
        regisPassword,
        firstLastName,
        image
    }

    const addActiveClass = (el) => el.classList.add(styles.active)
    const removeActiveClass = (el) => el.classList.remove(styles.active)

    useEffect(() => {
        setUser(typeof window !== "undefined" && window.sessionStorage.getItem("usr") && userData && userData.find(item => item.id === window.sessionStorage.getItem("usr")))
    }, [userData, login])

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

    useEffect(() => {
        user ? setLogin(true) : setLogin(false)
        handleInput()
        Object.values(refs).forEach(ref => {
            const element = ref.current
            element.value = ""
        })
    }, [login, modalLogin, user])  // eslint-disable-line react-hooks/exhaustive-deps

    const inputEnter = (e) => {
        if (e.key === "Enter") {
            btnLogin ? loginControl() : registerControl()
        }
    }

    const handleInput = () => {
        Object.values(refs).forEach(ref => {
            const element = ref.current
            removeActiveClass(element)
        })
        logMessage.current.innerText = ""
        regisMessage.current.innerText = ""

    }

    const loginControl = () => {
        !logUsername.current.value && addActiveClass(logUsername.current)
        !logPassword.current.value && addActiveClass(logPassword.current)

        if (!logUsername.current.value || !logPassword.current.value) {
            logMessage.current.innerText = "Boş bölmələri doldurun!"
        }

        else {
            const userInfo = userData && userData.find(item => item.user_name === logUsername.current.value && item.password === logPassword.current.value)
            userInfo ? window.sessionStorage.setItem("usr", userInfo.id) || setLogin(true) || setModalLLogin(false) : logMessage.current.innerText = "İstifadəçi adı və ya parol yalnışdır!"
            logUsername.current.value = ""
            logPassword.current.value = ""
        }
    }

    const registerControl = () => {
        !firstLastName.current.value && addActiveClass(firstLastName.current)
        !image.current.value && addActiveClass(image.current)
        !regisUsername.current.value && addActiveClass(regisUsername.current)
        !regisPassword.current.value && addActiveClass(regisPassword.current)
        if (!firstLastName.current.value || !image.current.value || !regisUsername.current.value || !regisPassword.current.value) {
            regisMessage.current.innerText = "Boş bölmələri doldurun!"
        }

        else {
            const user = userData && userData.find(item => item.user_name === regisUsername.current.value)

            if (user) {
                addActiveClass(regisUsername.current)
                regisMessage.current.innerText = "Bu adda istifadəçi mövcüddur"

            }
            else {
                const data = { author_name: firstLastName.current.value, author_img: image.current.value, user_name: regisUsername.current.value, password: regisPassword.current.value }
                fetch(`${url}/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                setLogin(true)
                setModalLLogin(false)
                setSuccessful(true)
                router.refresh()
                firstLastName.current.value = ""
                image.current.value = ""
                regisUsername.current.value = ""
                regisPassword.current.value = ""
            }
        }
    }

    async function getCurrency() {
        try {
            const res = await fetch(`${url}/currency`);
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
        refmobSearch.current.focus()
    }

    const searchBtn = () => {
        setSearchCancel(true)
    }

    const cancelBtn = () => {
        setSearchCancel(false)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.push('/xeber-axtarisi')
            setSearchValue(e.target.value)
            refmobSearch.current.value = ""
            refSearch.current.value = ""
            setSearchCancel(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = toggle ? "hidden" : "auto"
    }, [toggle])

    const toggleLang = (index) => {
        setActive(index)
    }

    const exit = () => {
        const question = window.confirm("İstifadəçi profilindən çıxış edilsin?")
        if (question) {
            window.sessionStorage.removeItem("usr")
            setLogin(false)
            setBtnLogin(false)
        }
        else return
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            setScrolling(scrollTop)
            if (scrollTop > 200 && scrollTop < (scrolling)) {
                setVisibleGoUp(true)
            }
            else {
                setVisibleGoUp(false)
            }
        })
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const goUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <header className={styles.header}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                transition={Flip}
                rtl={false} //false - progressbarın sağdan sola azalması / true - progressbarın sağdan sola azalması
                pauseOnFocusLoss
                pauseOnHover
                theme={`${dark ? "dark" : "light"}`}
            />
            <div className={`${styles.overlay} ${modalLogin ? styles.active : ""}`} onClick={() => { setModalLLogin(false) }}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.close} onClick={() => { setModalLLogin(false) }}>
                        <i className="icon-cancel"></i>
                    </div>
                    <div className={styles.title}>
                        <h2>{`${btnRegis ? "Qeydiyyat bölməsi" : "Portala Giriş"}`}</h2>
                    </div>
                    <form className={`${styles.formLogin} ${btnRegis ? styles.active : ""}`}>
                        <input type="text" name="login" placeholder="İstifadəçi adı" ref={logUsername} onInput={handleInput} onKeyDown={inputEnter} />
                        <input type="password" name="password" placeholder="Parol" ref={logPassword} onInput={handleInput} onKeyDown={inputEnter} />

                        <span ref={logMessage}></span>
                        <p>Hesabınız yoxdursa <Link href="" onClick={() => { setModalLLogin(true); setBtnRegis(true); setBtnLogin(false) }}>qeydiyyat</Link>dan keçin</p>
                        <button type="button" onClick={loginControl}>Daxil ol</button>
                    </form>
                    <form className={`${styles.formRegister} ${btnLogin ? styles.active : ""}`}>
                        <input type="text" name="name-lastname" placeholder="Ad və Soyad" ref={firstLastName} onInput={handleInput} onKeyDown={inputEnter} />
                        <input type="text" name="image" placeholder="Profil şəkli" ref={image} onInput={handleInput} onKeyDown={inputEnter} />
                        <input type="text" name="login" placeholder="İstifadəçi adı" ref={regisUsername} onInput={handleInput} onKeyDown={inputEnter} />
                        <input type="password" name="password" placeholder="Parol" ref={regisPassword} onInput={handleInput} onKeyDown={inputEnter} />
                        <span ref={regisMessage}></span>
                        <button type="button" onClick={registerControl}>Göndər</button>
                    </form>
                </div>
            </div>
            <div className={`${styles.overlayMob} ${toggle ? styles.active : ""}`} onClick={() => { setToggle(false) }}>
            </div>
            {
                successful &&
                <div className={styles.successful} onClick={() => { setSuccessful(false) }}>
                    <div className={styles.wrapper} onClick={(e) => { e.stopPropagation() }}>
                        <h2>Qeydiyyad uğurla tamamlandı</h2>
                        <p>Qeydiyyatdan keçdiyiniz istifadəçi adı və parol ilə sayta giriş edə nilərsiniz</p>
                        <div className={styles.close} onClick={() => { setSuccessful(false) }}>
                            <i className="icon-cancel"></i>
                        </div>
                    </div>
                </div>
            }
            <div className={`${styles.goUp} ${visibleGoUp ? styles.active : ""}`} onClick={goUp}>
                <span className="icon-up-open"></span>
            </div>
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
                                    <li><Link href="https://t.me/reportnewsaz"><FaTelegramPlane /></Link></li>
                                    <li><Link href="https://twitter.com/reportnewsaz"><i className="icon-twitter"></i></Link></li>
                                    <li><Link href="https://www.linkedin.com/company/report-news-agency"><i className="icon-linkedin"></i></Link></li>
                                    <li><Link href="https://www.youtube.com/channel/UCPSpgPJwGhr5uB0Uui8Lj8g"><i className="icon-youtube-play"></i></Link></li>
                                </ul>
                                <div className={`${styles.theme} ${dark ? styles.active : ""}`}>
                                    <div className={styles.dark} onClick={darkMode}>
                                        <button><i className="icon-moon-inv"></i></button>
                                    </div>
                                    <div className={styles.light} onClick={lightMode}>
                                        <button><i className="icon-sun-filled"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.headerBottom}>
                <div className="container">
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
                                        <div className={styles.mobSearch}>
                                            <input type="text" placeholder="Açar sözü daxil edin" onKeyDown={handleSearch} ref={refmobSearch} />
                                        </div>
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

                                        <div className={styles.mobLogout}>
                                            <div className={styles.mobExit}>
                                                <Link href="/" onClick={exit}>Çıxış</Link>
                                            </div>
                                            <div className={`${styles.mobTheme} ${dark ? styles.active : ""}`}>
                                                <div className={styles.dark} onClick={darkMode}>
                                                    <button><i className="icon-moon-inv"></i></button>
                                                </div>
                                                <div className={styles.light} onClick={lightMode}>
                                                    <button><i className="icon-sun-filled"></i></button>
                                                </div>
                                            </div>
                                        </div>
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
                                <div className={`${styles.userInfo} ${login ? styles.active : ""}`}>
                                    <button className={login ? styles.active : ""} onClick={() => { setModalLLogin(true); setBtnLogin(true); setBtnRegis(false) }}><span className="icon-user"></span></button>
                                    <div className={`${styles.authorImage} ${login === false ? styles.active : ""}`}>
                                        <Link href="/author">
                                            {user && <Image src={user.author_img} width={38} height={38} alt={user.author_name} />}
                                        </Link>
                                    </div>
                                    <div className={`${styles.exit} ${!login ? styles.active : ""}`}>
                                        <Link href="/" onClick={exit}><i className="icon-logout"></i></Link>
                                    </div>
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
                                    <input type="text" placeholder="Açar sözü daxil edin" onKeyDown={handleSearch} ref={refSearch} />
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