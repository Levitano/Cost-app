import { useState, useEffect } from "react"
import styles from './EditProject.module.css'
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'


import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from './services/ServiceForm'
import ServiceCard from "./services/ServiceCard"

function EditProject() {
    const { id } = useParams()


    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setService] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((response) => response.json())
                .then((data) => {
                    setProject(data)
                    setService(data.services)

                }).catch((err) => console.log(err))
        }, 300)
    }, [id])

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !== id)
        const projectUptdated = project

        projectUptdated.services = servicesUpdated
        projectUptdated.cost = parseFloat(projectUptdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUptdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUptdated)
        }).then((response) => response.json())
            .then((data) => {
                setProject(projectUptdated)
                setService(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)

    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function ediPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(response => response.json()).then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado com sucesso')
            setType('success')
        }).catch((err) => console.log(err))
    }


    function createService(project) {
        setMessage('O orçamento não pode ser menor que o custo do projeto')
        setType('error')
        //*get the last service
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //* Maximu value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //* add service cost to project total cost
        project.cost = newCost

        //* Update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((response) => response.json())
            .then((data) => {
                //Exibir serviços
                setShowProjectForm(!showProjectForm)
            })


    }


    return (
        <>
            {
                project.name ? (
                    <div className={styles.project_details}>

                        <Container customClass='column'>

                            {message && <Message type={type} msg={message} />}

                            <div className={styles.details_container}>

                                <h1>Projeto: {project.name}</h1>

                                <button className={styles.btn} onClick={toogleProjectForm}>

                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}

                                </button>

                                {!showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria: </span>{project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento: </span>R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado: </span>R${project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.project_info}>
                                        <ProjectForm handleSubmit={ediPost} btnText='Concluir Edição'
                                            projectData={project} />
                                    </div>
                                )}

                            </div>

                            <div className={styles.service_form_container}>
                                <h2>Adiciona um serviço</h2>
                                <button className={styles.btn} onClick={toogleServiceForm}>

                                    {showServiceForm ? 'Fechar' : 'Adicionar serviço'}
                                </button >
                                <div className={styles.project_info}>
                                    {
                                        showServiceForm && (<ServiceForm
                                            handleSubmit={createService}
                                            textBtn='Adicionar Serviço'
                                            projectData={project}
                                        />)
                                    }
                                </div>
                            </div>

                            {/*Adicionar Serviço */}
                            <h2>Serviços</h2>
                            <Container customClass='start' >
                                {
                                    services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            description={service.description}
                                            cost={service.cost}
                                            key={service.key}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {
                                    services.length === 0 && (
                                        <p>Não há serviços</p>
                                    )
                                }
                            </Container>

                        </Container>

                    </div>

                ) : (
                    <Loading />
                )
            }
        </>
    )
}

export default EditProject