import { Link } from "react-router-dom"
import { Container } from "./Container"

import Styles from '../css/NavBar.module.css'
import logo from '../img/costs_logo.png'

export const NavBar = () => {
    return (
        <nav className={Styles.navBar}>
            <Container>
                <Link to='/'>
                    <img src={logo} alt='Costs'></img>
                </Link>

                <ul className={Styles.list}>
                    <li className={Styles.item}><Link to='/'>Home</Link></li>
                    <li className={Styles.item}><Link to='/projects'>Projetos</Link></li>
                    <li className={Styles.item}><Link to='/company'>Empresa</Link></li>
                    <li className={Styles.item}><Link to='/contact'>Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}