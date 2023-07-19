import React, { useState } from 'react'
import classes from '../styles/Form.module.css'

const AddBook = () => {
    const [inputs, setInputs] = useState(
        { name: "", description: "", imgUrl: '' }
    )
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = () => {
        fetch('/api/books/', {
            method: 'POST',
            body: JSON.stringify({
                name: inputs.name,
                description: inputs.description,
                imgUrl: inputs.imgUrl
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputs.name || !inputs.description || !inputs.imgUrl) {
            return
        }
        sendRequest()
        setInputs({ name: "", description: "", imgUrl: '' })
    }
    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.formControl}>
                <label htmlFor="name">name</label>
                <input
                    value={inputs.name}
                    onChange={handleChange}
                    type="text"
                    name="name" />
                <label htmlFor="description">description</label>
                <input
                    value={inputs.description}
                    onChange={handleChange}
                    type="text"
                    name='description' />
                <label htmlFor="imgUrl">imgUrl</label>
                <input
                    value={inputs.imgUrl}
                    onChange={handleChange}
                    type="text"
                    name='imgUrl' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddBook