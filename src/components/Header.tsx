import styles from './Header.module.css'
import Logo  from '../assets/marvel_logo.svg'
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles['marvel-logo']}>
                <img src={Logo} alt="Marvel logo" />
            </div>
            <nav className={styles.nav}>
                <NavLink to="/characters" className={({ isActive }) => isActive ? styles.active : ''}>Characters</NavLink>
                <NavLink to="/comics" className={({ isActive }) => isActive ? styles.active : ''}>Comics</NavLink>
            </nav>
        </header>
    )
}

export default Header