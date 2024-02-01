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
                                    <li><Link href={`latest`}>Son xəbərlər</Link></li>
                                    <li><Link href="#">Siyasət</Link></li>
                                    <li><Link href="#">İqtisadiyyat</Link></li>
                                    <li><Link href="#">COP29</Link></li>
                                    <li><Link href="#">Cəmiyyət</Link></li>
                                    <li><Link href="#">İdman</Link></li>
                                    <li><Link href="#">Mədəniyyət</Link></li>
                                    <li><Link href="#">Dünya</Link></li>
                                    <li><Link href="#">Analitika</Link></li>
                                    <li><Link href="#">Multimedia</Link></li>
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