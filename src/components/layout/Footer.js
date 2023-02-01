import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import Styles from '../css/Footer.module.css'


export const Footer = () => {
    return (
        <footer className={Styles.footer}>
            <ul className={Styles.socialList}>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>

            <p className={Styles.copyRight}><span>Costs</span> &copy; 2023</p>
        </footer>
    )
}