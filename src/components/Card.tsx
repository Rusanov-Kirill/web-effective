import React from 'react';
import { Link } from 'react-router-dom'
import styles from './modules/Card.module.css'

interface CardProps {
    id: string;
    image: string;
    name: string;
    description: string;
    link: string;
    participatingIn: string[];
}

const Card: React.FC<CardProps> = ({ image, name, description, link }) => {
    return (
        <Link to={link} className={styles.link}>
            <div className={styles.card}>
                <img src={image} alt={name} className={styles.image} />
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    )
}

export default Card;