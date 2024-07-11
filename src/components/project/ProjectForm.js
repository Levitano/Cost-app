import { useEffect, useState } from 'react'

import Input from '../form/Input'
import styles from './ProjectForm.module.css'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }
        ).then((response) => response.json())
            .then((data) => {
                setCategories(data)

                console.log(data);

            })
            .catch((err) => console.log(`${err} Aconteceu algum erro`))
    }, [])

    const submit = (e) => {
        e.preventDefault()

        handleSubmit(project)
        console.log(project)
    }

    function handleChange(e) {
        setProject({
            ...project, [e.target.name]: e.target.value

        })

    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>

            <Input

                type="text"
                text="Nome do Projeto"
                name="name"
                value={project.name || ''}
                placeholder="Insira o nome do Projeto"
                handleOnChange={handleChange}
            />

            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o valor total do teu projeto"
                handleOnChange={handleChange}
                value={project.budget || ''}
            />

            <Select
                id="category_id"
                text="Selecione a categoria"
                options={categories}
                value={project?.category?.id}
                handleOnChange={handleCategory} />

            <SubmitButton text={btnText} />



        </form>
    )
}

export default ProjectForm