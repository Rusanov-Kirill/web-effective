import styles from './modules/CharactersAndComicsDetails.module.css';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import characterStore from '../stores/CharactersAndComicsStore';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const CharacterDetails: React.FC = observer(() => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            characterStore.getCharacterInfo(parseInt(id));
        } else {
            console.error('No character ID provided');
        }
    }, [id]);

    const character = characterStore.selectedCharacter;

    if (characterStore.loading) {
        return (
            <Loading />
        );
    }

    if (!character) {
        return <div>Character not found</div>;
    }

    return (
        <div>
            <div>
                <img src={character.image} alt={character.name} className={styles['entity-image']} />
            </div>
            <div className={styles['info-container']}>
                <div className={styles['title-description']}>
                    <h3>{character.name}</h3>
                    <h6 className={styles.description}>{character.description}</h6>
                </div>
                <div className={styles['entity-container']}>
                    <h3>Comics</h3>
                    <div>
                        <ul className={styles.ul}>
                            {character.participatingIn && character.participatingIn.length > 0 ? (
                                character.participatingIn.map((comic, idx) => (
                                    <li className={styles.li} key={comic.id || idx}>
                                        <Link className={styles.linkToRelated} to={`/comics/${comic.id}`}>{comic.name}</Link>
                                    </li>
                                ))
                            ) : (
                                <li>No comics found for this character</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default CharacterDetails