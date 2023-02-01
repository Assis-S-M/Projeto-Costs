import { useEffect, useState } from 'react'

import Styles from '../css/ProjectForm.module.css'

import { Input } from "./Input"
import { Select } from "./Select"
import { Button } from './Button'

export const ProjectForm = ({ handleSubmit, projectData, btnText }) => {
    
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories').then(resp => {
            resp.json().then((data) => {
                setCategories(data)
            })
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value})
    }

    const handleCategory = (e) => {

        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form id='projectForm' className={Styles.form} onSubmit={submit}>
            <Input idInput='nomeProjeto' inputName='nomeProjeto' value={project.nomeProjeto || ''} labelText='Nome do projeto: ' type='text' placeholder='Insira o nome do projeto' onChange={handleChange} />

            <Input idInput='orcamento' inputName='orcamento' value={project.orcamento || ''} labelText='Orçamento: ' type='number' placeholder='Insira o orçamento do projeto' onChange={handleChange} />

            <Select idInput='categorias' inputName='categorias' labelText='Selecione a categoria: ' optionsArray={categories} onChange={handleCategory} />

            <Button type='submit' btnText={btnText}/>
        </form>
    )
}