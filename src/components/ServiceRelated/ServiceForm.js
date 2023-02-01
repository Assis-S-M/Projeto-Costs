import Styles from '../css/ProjectForm.module.css'

import { useEffect, useState } from 'react'

import { Input } from '../ProjectRelated/Input'
import { Button } from '../ProjectRelated/Button'

export const ServiceForm =  ({ handleSubmit }) => {

    const [service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(service)
    }

    const handleChange = (e) => {
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={Styles.form}>
            <Input idInput='nomeServico' inputName='nomeServico' type='text' labelText='Insira o nome do serviço' placeholder='insira o serviço...' onChange={handleChange} />

            <Input idInput='custoServico' inputName='custoServico' type='number' labelText='Insira o custo do serviço' placeholder='Insira o custo...' onChange={handleChange} />

            
            <Input idInput='descServico' inputName='descServico' type='text' labelText='Insira a descrição do serviço' placeholder='Insira a descrição...' onChange={handleChange} />

            <Button type='submit' btnText='Concluir adição' />
        </form>
    )
}