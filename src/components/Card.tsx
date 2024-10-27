import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    id: number;
    image: string;
    name: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ image, name, description }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    )
}

export default Card;