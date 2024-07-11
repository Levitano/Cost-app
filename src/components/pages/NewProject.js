import React from "react"

import { useNavigate } from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from "../project/ProjectForm"

function NewProject() {
    const Navigate = useNavigate()

    function createPost(project) {


        // initialize services and costs
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((response) => response.json())
            .then((data) => {

                console.log(data);

                Navigate('/Projetos', { message: 'Projeto criado com sucesso' })
                //Redirect
                /* console.log(data)
                 history(<Link to='/Projetos'>Projetos</Link>)*/
            })
            .catch((err) => {
                console.log(`${err} aconteceu algum erro`)
            })

    }

    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>

            <ProjectForm handleSubmit={createPost} btnText='Criar  Projeto' />
        </div>
    )
}

export default NewProject