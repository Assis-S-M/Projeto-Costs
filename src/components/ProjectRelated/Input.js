import Styles from '../css/ProjectForm.module.css'

export const Input = ({idInput, inputName, value, labelText, type, placeholder, onChange}) => {
    return (
        <div className={Styles.formControl}>
            <label htmlFor={idInput}>{labelText}</label>
            <input id={idInput} name={inputName} value={value} type={type} placeholder={placeholder} onChange={onChange} />
            <br />
        </div>
    )
}