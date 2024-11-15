import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './modules/Card.module.css'
import FavICON from '../assets/favorites_unactive.svg'
import FavActiveICON from '../assets/favorites_active.svg'
import CardComponentProps from '../types/card'

const Card: React.FC<CardComponentProps> = ({ id, image, name, description, link, participatingIn, onFavoriteUpdate }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isInFavorites = favorites.some((item: { id: number }) => item.id === id);
        setIsFavorite(isInFavorites);
    }, [id]);

    const handleFavoriteClick = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (isFavorite) {
            const updatedFavorites = favorites.filter((item: { id: number }) => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            onFavoriteUpdate?.(id);
            console.log(JSON.parse(localStorage.getItem('favorites') || '[]'));
        } else {
            const newFavorite = { id, name, image, description, link, participatingIn };
            favorites.push(newFavorite);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log(JSON.parse(localStorage.getItem('favorites') || '[]'));
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <Link to={link} className={styles.link}>
            <div className={styles.card}>
                <img src={image} alt={name} className={styles.image} />
                <img
                    src={isFavorite ? FavActiveICON : FavICON}
                    alt={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
                    className={styles.favicon}
                    onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteClick();
                    }}
                />
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    )
}

export default Card;