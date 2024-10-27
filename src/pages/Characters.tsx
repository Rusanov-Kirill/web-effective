import styles from './Characters.module.css'
import { characters } from '../mocks/characters'
import Card from '../components/Card'

function Characters() {
    const justifyContent = characters.length % 6 === 0 ? 'space-between' : 'flex-start';

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Characters</h1>
            <div className={styles['search-field-container']}>
                <input type='text' placeholder='Search for Characters by Name' className={styles['input-search-field']} />
                <button className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {characters.map(character => (
                    <Card
                        key={character.id}
                        id={character.id}
                        image={character.image}
                        name={character.name}
                        description={character.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default Characters

