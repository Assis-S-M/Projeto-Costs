import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import { Message } from "../layout/Message"
import { Container } from '../layout/Container'
import { LinkButton } from '../layout/LinkButton'
import { Loading } from "../layout/Loading"

import { ProjectCard } from "../ProjectRelated/ProjectCard"

import Styles from '../css/Projects.module.css'

export const Projects = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [projects, setProjects] = useState([])
    const [removeLoading, setLoadRemove] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects').then((resp) => {
            resp.json().then((data) => {
                setProjects(data)
                setLoadRemove(true)
            })
        }).catch((err) => {
            console.log(err)
        })
        }, 500);
    }, [])

    const removeProject = (id) => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            resp.json()
            setProjects(projects.filter((project) => {
                project.id != id
            }))
            navigate('/projects', {state: {msg: 'Projeto deletado com sucesso', type: 'success'}})
        })
    }

    return (
        <div className={Styles.pageContainer}>

            {location.state && <Message msg={location.state.msg} type={location.state.type} />}


            <div className={Styles.projectContainer}>
                <div className={Styles.titleContainer}>
                    <h1>Meus projetos</h1>
                </div>
            
                <Container customClass='start'>
                    <p>Projetos</p>
                </Container>
            </div>

            {!removeLoading && <Loading />}

            <div className={Styles.projectsList}>
                {projects.lenght != 0 && projects.map((project) => {
                    return <ProjectCard id={project.id} nome={project.nomeProjeto} orcamento=  {project.orcamento} categoria={project.category.name} handleRemove={removeProject} />
                })}

                {removeLoading && projects.lenght === 0 && (
                    <p>Sem projetos cadastrados :/</p>
                )}
            </div>
            <div className={Styles.buttonContainer}>    
                <LinkButton to='/newproject' text='Criar projeto' />
            </div>

        </div>
    )
}