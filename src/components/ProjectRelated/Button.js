import Styles from '../css/ProjectForm.module.css'

export const Button = ({type, btnText}) => {

    return (
        <div className={Styles.formControl} >
            <button type={type}>{btnText}</button>
        </div>
    )
}