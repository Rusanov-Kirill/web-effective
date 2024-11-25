import styles from './modules/CharactersAndComicsDetails.module.css'
import { characters } from '../mocks/characters'
import { useParams } from 'react-router-dom'
import { comics } from '../mocks/comics'

function CharacterDetails() {
    const { id } = useParams();
    const character = characters.find(char => char.id === id);

    if (!character) {
        return <div>Character not found</div>;
    }

    const characterComics = comics.filter(comic => character.participatingIn.includes(comic.id));

    return (
        <div>
            <img src={character.image} alt={character.name} className={styles['entity-image']} />
            <div className={styles['info-container']}>
                <div className={styles['title-description']}>
                    <h3>{character.name}</h3>
                    <h6 className={styles.description}>{character.description}</h6>
                </div>
                <div className={styles['entity-container']}>
                    <h3>Comics</h3>
                    <div>
                        <ul className={styles.ul}>
                            {characterComics.length > 0 ? (
                                characterComics.map(comic => (
                                    <li className={styles.li} key={comic.id}>
                                        <a className={styles.a} href={`/comics/${comic.id}`}>{comic.name}</a>
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
}

export default CharacterDetails