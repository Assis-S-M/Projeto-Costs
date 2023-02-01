import Styles from '../css/Home.module.css'
import savings from '../img/savings.svg'
import { LinkButton } from '../layout/LinkButton'

export const Home = () => {
    return (
        <section className={Styles.homeContainer}>
            <h1>Bem vindo ao <span>Costs</span></h1>
            <p>Começe a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to='/newProject' text='Criar projeto'/>
            <img src={savings} alt='Costs'></img>
        </section>
    )
}