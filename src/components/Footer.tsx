import styles from './modules/Footer.module.css'
import Logo  from '../assets/header_footer_logo.svg'

function Footer() {
    const CURRENT_YEAR = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <img src={Logo} alt="Marvel logo" className={styles['marvel-logo']}/>
            <p className={styles.p}>Data provided by Marvel. © {CURRENT_YEAR} MARVEL</p>
            <p className={styles.p}>developer.marvel.com</p>
        </footer>
    )
}

export default Footer