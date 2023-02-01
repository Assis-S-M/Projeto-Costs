import Styles from '../css/ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'

export const ProjectCard = ({id, nome, orcamento, categoria, handleRemove}) => {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={Styles.projectCard}>
            <h4>{nome}</h4>

            <p>
                <span>Orcamento: </span> R${orcamento}
            </p>
            <p className={Styles.categoryText}>
                <span className={Styles[categoria]}></span> {categoria}
            </p>

            <div className={Styles.projectCardActions}>
                <Link to={`/editProject/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}