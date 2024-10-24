import styles from './Header.module.css'
import Logo  from '../assets/marvel_logo.svg'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles['marvel-logo']}>
                <img src={Logo} alt="Marvel logo" />
            </div>
            <nav className={styles.nav}>
                <a>Characters</a>
                <a>Comics</a>
            </nav>
        </header>
    )
}

export default Header