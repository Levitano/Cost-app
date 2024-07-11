import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from './Projects.module.css'



import Container from '../layout/Container'
import LinkButton from '../layout/Linkbutton'
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"


function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                // body: JSON.stringify(projects)
            }).then((response) => response.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                }).catch((err) => console.log(err))
        }, 3000)

    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projecto Removido com sucesso')

            }).catch(err => console.log(err))
    }








    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
        console.log(message)
    }


    return (
        <div className={styles.project_Container} >
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>


            {message && <Message type='success' msg={message} />}

            {projectMessage && <Message type='success' msg={projectMessage} />}



            {/*<Message type='success' msg='Projeto criado com sucesso' />*/}


            <Container customClass='start'>
                {projects.length > 0 && (projects.map((project) => <ProjectCard
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    category={project.category}
                    key={project.id}
                    handleRemove={removeProject}

                />))}

                {!removeLoading && <Loading />}

                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos Cadastrados!</p>

                )}

            </Container>

        </div>
    )
}

export default Projects