import Styles from '../css/ProjectForm.module.css'

export const Select = ({idInput, inputName, value, labelText, optionsArray, onChange}) => {
    
    return (
        <>
            <div className={Styles.formControl}>
                <label htmlFor={idInput}>{labelText}</label>
                <select id={idInput} name={inputName} onChange={onChange}>
                    <option value=''></option>
                    {optionsArray.map((item) => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>

            <br />
        </>
    )
}