import Styles from '../css/NewProject.module.css'

import { ProjectForm } from '../ProjectRelated/ProjectForm'
import { Message } from '../layout/Message'

import { useNavigate, useLocation } from 'react-router-dom'

export const NewProject = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const createProject = (project) => {

        if(project.id != '' && project.nomeProjeto != '' && project.orcamento && project.category) {

        project.cost = 0
        project.services = []
        console.log(JSON.stringify(project))

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => {
            resp.json().then(data => {
                navigate('/projects', {state: {msg: 'Projeto criado com sucesso!', type: 'success'}})
            }).catch(
                navigate('/projects', {state: {msg: 'Erro ao criar projeto', type: 'error'}})
            )
        })
    } else {
        navigate('/newproject', {state: {msg: 'Preencha todos os campos antes de criar um projeto!', type: 'error'}})
    }
    }

    return (
        <div className={Styles.newProjectContainer}>

            {location.state && (<p><Message msg={location.state.msg} type={location.state.type} /></p>)}

            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createProject} btnText='Criar projeto'/>
        </div>
    )
}