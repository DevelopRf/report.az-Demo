import styles from "./Header.module.scss"
import Link from "next/link"
import Image from "next/image"

const Header = () => {    
    return (
        <header>
            <div className="headerBottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.wrapper}>
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
                                <div className={styles.logo}>
                                    <Link href="/"><Image className={styles.logo}
                                        src="https://report.az/public/images/logo-dark-az.png"
                                        priority={true}
                                        width={280}
                                        height={49}
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
                                    <li><Link href="/analitik">Analitika</Link></li>
                                    <li><Link href="/multimedia">Multimedia</Link></li>
                                </ul>
                                <form className={styles.searchBox}>
                                    <input type="text" placeholder="Açar sözü daxil edin" />
                                </form>
                                <div className={styles.searchBtn}>
                                    <Link href="#"><Image src="/img/search.svg" width={20} height={20} alt="search"/></Link>
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