import styles from './modules/CharactersAndComics.module.css'
import { comics } from '../mocks/comics.ts'
import Card from '../components/Card.tsx'

function Comics() {
    const justifyContent = comics.length % 6 === 0 ? 'space-between' : 'flex-start';

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Comics</h1>
            <div className={styles['search-field-container']}>
                <input type='text' placeholder='Search for Comics by Name' className={styles['input-search-field']} />
                <button className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {comics.map(comic => (
                    <Card
                        key={comic.id}
                        id={comic.id}
                        image={comic.image}
                        name={comic.name}
                        description={comic.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comics