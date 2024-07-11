import { Link } from "react-router-dom"

import Container from "./Container"

import styles from './NavBar.module.css'
import logo from '../../img/costs_logo.png'

function NavBar() {
    return (
        <nav className={styles.navBar}>
            <Container>
                <Link exact='true' to='/' >
                    <img src={logo} alt={'costs'} />
                </Link>
                <ul className={styles.list}>

                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/Projetos'>Projetos</Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/contato'>Contato</Link>
                    </li >
                    <li className={styles.item}>
                        <Link to='/Empresa'>Empresa</Link>
                    </li>





                </ul>
            </Container>


        </nav>

    )
}

export default NavBar