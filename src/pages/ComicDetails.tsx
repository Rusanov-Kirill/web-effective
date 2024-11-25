import styles from './modules/CharactersAndComicsDetails.module.css'
import { characters } from '../mocks/characters'
import { useParams } from 'react-router-dom'
import { comics } from '../mocks/comics'

function ComicDetails() {
    const { id } = useParams();
    const comic = comics.find(com => com.id === id);

    if (!comic) {
        return <div>Comics not found</div>;
    }

    const characterInComics = characters.filter(char => comic.participatingIn.includes(char.id));

    return (
        <div>
            <img src={comic.image} alt={comic.name} className={styles['entity-image']} />
            <div className={styles['info-container']}>
                <div className={styles['title-description']}>
                    <h3>{comic.name}</h3>
                    <h6 className={styles.description}>{comic.description}</h6>
                </div>
                <div className={styles['entity-container']}>
                    <h3>Characters</h3>
                    <div>
                        <ul className={styles.ul}>
                            {characterInComics.length > 0 ? (
                                characterInComics.map(char => (
                                    <li className={styles.li} key={char.id}>
                                        <a className={styles.a} href={`/characters/${char.id}`}>{char.name}</a>
                                    </li>
                                ))
                            ) : (
                                <li>No characters found for this comic</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComicDetails