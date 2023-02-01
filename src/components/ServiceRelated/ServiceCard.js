import { BsFillTrashFill } from 'react-icons/bs'
import Styles from '../css/ProjectCard.module.css'

export const ServiceCard = ({id, nome, custo, desc, handleRemove}) => {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, custo)
    }
    
    return (
        <div className={Styles.projectCard}>
            <h4>{nome}</h4>
            <p>
                <span>Custo total: </span> R${custo}
            </p>
            <p>
                {desc}
            </p>

            <div className={Styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}