import React, { useEffect } from 'react';
import characterStore from '../stores/CharacterAndComicsStore.ts';
import { observer } from 'mobx-react-lite';
import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import Loading from '../components/Loading.tsx';

const Characters: React.FC = observer(() => {
    const justifyContent = characterStore.characters.length % 6 === 0 ? 'space-between' : 'flex-start';

    useEffect(() => {
        characterStore.getCharactersList();
      }, []);

      if (characterStore.loading) {
        return (
          <Loading />
        );
      }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Characters</h1>
            <div className={styles['search-field-container']}>
                <input type='text' placeholder='Search for Characters by Name' className={styles['input-search-field']} />
                <button className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {characterStore.characters.map(character => (
                    <Card
                        key={character.id}
                        id={character.id}
                        image={character.image}
                        name={character.name}
                        description={character.description}
                        link={`/characters/${character.id}`}
                        participatingIn={character.participatingIn?.map((comic) => comic.name)}
                    />
                ))}
            </div>
        </div>
    )
});

export default Characters

