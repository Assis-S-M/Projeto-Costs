import Styles from '../css/editProject.module.css'
import { Loading } from '../layout/Loading'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { ProjectForm } from '../ProjectRelated/ProjectForm'
import { ServiceForm } from '../ServiceRelated/ServiceForm'
import { ServiceCard } from '../ServiceRelated/ServiceCard'
import { Container } from '../layout/Container'
import { Message } from '../layout/Message'

export const EditProject = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [project, setProject] = useState({})
    const [services, setServices] = useState([])

    useEffect(() => {

       setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                resp.json()
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
            })
       }, 500);

    }, [id])

    const editPost = (project) => {
        
        if (project.cost < project.orcamento) {

            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            }).then((resp) => {
                resp.json()
                .then((data) => {
                    setProject(data)
                    setShowProjectForm(false)

                    navigate(`/editProject/${project.id}`, {state: {msg: "Projeto editado com sucesso!", type: 'success'}})
                })
            })

        } else {
            navigate(`/editProject/${project.id}`, {state: {msg: "O custo do projeto não pode ultrapassar o orçamento", type: 'error'}})
        }
    }

    const createService = (service) => {

        if (service.nomeServico == undefined || service.custoServico == undefined || Number(service.custoServico) <= 0 || service.descServico == undefined) {

            navigate(`/editProject/${project.id}`, {state: {msg: 'Preencha todos os campos corretamente antes de adicionar o projeto', type: 'error'}})

        } else if (project.cost + Number(service.custoServico) <= Number(project.orcamento)) {

            let id = 0;

            project.services.forEach(service => {
                id++
            });

            service.id = id
            

            project.services.push(service)
            project.cost += Number(service.custoServico)

            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            }).then((resp) => {
                resp.json()
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                    setShowServiceForm(false)

                    navigate(`/editProject/${project.id}`, {state: {msg: 'Serviço adicionado com sucesso!', type: 'success'}})
                })
            })

        } else {
            navigate(`/editProject/${project.id}`, {state: {msg: 'O custo total do projeto não pode ultrapassar o orçamento', type: 'error'}})
        }
    }

    const removeService = (id, custo) => {
        
        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost -= Number(custo) 

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => {
            resp.json()
            .then((data) => {
                setProject(data)
                setServices(servicesUpdated)

                navigate(`/editProject/${projectUpdated.id}`, {state: {msg: 'Serviço deletado com sucesso!', type: 'success'}})
            })
        })
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
        {project.nomeProjeto ? (
        <Container customClass='column'>
            <div className={`${Styles.projectDetails} ${Styles.detailsContainer}`}>
            
            {location.state && <Message msg={location.state.msg} type={location.state.type} />}

                <h1>Projeto: {project.nomeProjeto}</h1>
                <button className={Styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto': 'Fechar'}</button>

                {!showProjectForm ? (
                    <div className={Styles.projectInfo}>
                        <p>
                            <span>Categoria: </span> {project.category.name}
                        </p>

                        <p>
                            <span>Total do orçamento: </span> R${project.orcamento}
                        </p>

                        <p>
                            <span>Total utilizado: </span> R${project.cost}
                        </p>
                    </div>
                ): (
                    <div className={Styles.projectInfo}>
                        <ProjectForm  handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
                    </div>
                )}

                <div className={Styles.serviceFormContainer}>
                    <h2>Adicione um serviço: </h2>
                    <button className={Styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviços': 'Fechar'}</button>
                
                    <div className={Styles.projectInfo}>
                        {showServiceForm && (
                            <div>
                                <ServiceForm handleSubmit={createService} projectData={project} />
                            </div>
                        )}
                    </div>

                </div>
                
                <h2>Serviços</h2>

                <Container customClass='start'>
                    {project.services[0] != undefined && 
                    services.map((service) => (
                        <ServiceCard id={service.id} nome={service.nomeServico} custo={service.custoServico} desc={service.descServico} handleRemove={removeService} />
                    ))} 
                    
                    
                    {project.services[0] == undefined && <p>Nenhum serviço registrado :/</p>}
                </Container>

            </div>
        </Container>
        ): (<Loading />)}</>
    )
}