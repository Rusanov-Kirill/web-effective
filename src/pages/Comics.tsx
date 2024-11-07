import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import comicStore from '../stores/CharacterAndComicsStore.ts';
import Loading from '../components/Loading.tsx';

const Comics: React.FC = observer(() => {
    const justifyContent = comicStore.comics.length % 6 === 0 ? 'space-between' : 'flex-start';

    useEffect(() => {
        comicStore.getComicsList();
      }, []);

      if (comicStore.loading) {
        return (
          <Loading />
        );
      }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Comics</h1>
            <div className={styles['search-field-container']}>
                <input type='text' placeholder='Search for Comics by Name' className={styles['input-search-field']} />
                <button className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {comicStore.comics.map(comic => (
                    <Card
                        key={comic.id}
                        id={comic.id}
                        image={comic.image}
                        name={comic.name}
                        description={comic.description}
                        link={`/comics/${comic.id}`}
                        participatingIn={comic.participatingIn?.map((character) => character.name)}
                    />
                ))}
            </div>
        </div>
    )
});

export default Comics