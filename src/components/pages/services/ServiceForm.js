import { useState } from 'react'

import styles from '../../project/ProjectForm.module.css'
import Input from '../../form/Input'
import SubmitButton from '../../form/SubmitButton'


function ServiceForm({ handleSubmit, textBtn, projectData }) {
    const [service, setService] = useState({})


    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                placeholder='Insira o nome do serviço'
                text='Nome do serviço'
                name='name'
                handleOnChange={handleChange}

            />

            <Input
                type='number'
                placeholder='Insira o valor total'
                text='Custo do serviço'
                name='cost'
                handleOnChange={handleChange}

            />
            <Input
                type='text'
                placeholder='Descreva o serviço'
                text='Descrição do serviço'
                name='Description'
                handleOnChange={handleChange}

            />

            <SubmitButton
                text={textBtn}
            />

        </form>

    )
}

export default ServiceForm