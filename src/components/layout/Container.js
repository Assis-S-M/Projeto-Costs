import Style from '../css/Container.module.css'

export const Container = (props) => {
    return (
        <div className={`${Style.container} ${Style[props.customClass]}`}>
            {props.children}
        </div>
    )
}