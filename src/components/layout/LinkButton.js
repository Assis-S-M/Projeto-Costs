import Styles from '../css/LinkButton.module.css'

import { Link } from 'react-router-dom'

export const LinkButton = ({to, text}) => {
    return (
        <Link className={Styles.linkBtn} to={to}>{text}</Link>
    )
}