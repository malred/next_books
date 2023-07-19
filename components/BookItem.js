import React from 'react'
import classes from '../styles/Books.module.css'

const BookItem = ({ name, description, id, imgUrl }) => {
    return (
        <li className={classes.listItem}>
            <img src={imgUrl} alt={name} />
            <h3>{name}</h3>
            <p title={description}>{description}</p>
        </li>
    )
}

export default BookItem