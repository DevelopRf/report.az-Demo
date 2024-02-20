'use client'
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { HookContext } from "@/app/Hooks/Hook"
import styles from "./Header.module.scss"
import Link from "next/link"
import Image from "next/image"
import "../../styles/fontello/css/fontello.css"

const Header = ({ news }) => {

    const { toggle, setToggle, setSearchData } = useContext(HookContext)
    const [searchCancel, setSearchCancel] = useState(false)
    const router = useRouter()
    const handleChange = () => {
        setToggle(!toggle)
    }

    const searchBtn = () => {
        setSearchCancel(true)
    }

    const cancelBtn = () => {
        setSearchCancel(false)
    }

    const searchValue = (e) => {
        setSearchData(e.target.value.toLowerCase())
    }


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            /* return (
                setTerm(e.target.value)
            ) */
            router.push('/search')
        }
    }

    return (
        <header>
            <div className={styles.headerBottom}>
                <div className="container p-x">
                    <div className="row">
                        <div className="col-12 p-x">
                            <div className={styles.logoLang}>
                                <ul className={styles.langs}>
                                    <li>
                                        <Link href="#">Azərbaycan</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Русский</Link>
                                    </li>
                                    <li>
                                        <Link href="#">English</Link>
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
                                    </div>
                                </div>
                                <div className={styles.logo}>
                                    <Link href="/"><Image className={styles.logo}
                                        src="https://report.az/public/images/logo-dark-az.png"
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
                                    <input type="text" placeholder="Açar sözü daxil edin" onKeyDown={handleSearch} onChange={searchValue} />
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