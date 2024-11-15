import React, { useEffect, useState } from 'react';
import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card';
import CardComponentProps from '../types/card';

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Array<CardComponentProps>>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);

    const handleFavoriteUpdate = (id: number) => {
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
        setFavorites(updatedFavorites);
    };

    const justifyContent = favorites.length % 6 === 0 ? 'space-between' : 'flex-start';

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Favorites</h1>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <Card
                            key={favorite.id}
                            id={favorite.id}
                            image={favorite.image}
                            name={favorite.name}
                            description={favorite.description}
                            link={favorite.link}
                            participatingIn={favorite.participatingIn}
                            onFavoriteUpdate={handleFavoriteUpdate}
                        />
                    ))
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </div>
            <hr className={styles['hr-bottom']} />
        </div>
    );
};

export default Favorites;
