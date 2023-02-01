import Styles from '../css/Loading.module.css'
import loading from '../img/loading.svg'

export const Loading = () => {
    return (
        <div className={Styles.loaderContainer}>
            <img className={Styles.loader} src={loading} alt='costs'></img>
        </div>
    )
}