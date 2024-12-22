import React, { useEffect } from 'react';
import characterAndComicsStore from '../stores/CharactersAndComicsStore.ts';
import { observer } from 'mobx-react-lite';
import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import Loading from '../components/Loading.tsx';
import Pagination from '../components/Pagination.tsx';
import { REQUEST_LIMIT } from '../constants/constants.ts';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce.ts';

const Characters: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery);

    useEffect(() => {
        if (debounceSearchQuery) {
            characterAndComicsStore.getCharactersList(1, debounceSearchQuery); 
        }
    }, [debounceSearchQuery]);

    const handleSearch = () => {
        characterAndComicsStore.getCharactersList(1, searchQuery); 
    };

    const justifyContent = characterAndComicsStore.characters.length % 6 === 0 ? 'space-between' : 'flex-start';

    const { currentCharacterPage, characterLimit } = characterAndComicsStore;
    const totalCharacters = REQUEST_LIMIT;

    useEffect(() => {
        characterAndComicsStore.resetCharacterPage();
    }, []);

    const handlePageChange = (page: number) => {
        characterAndComicsStore.setCharacterPage(page);
    };

    if (characterAndComicsStore.loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Characters</h1>
            <div className={styles['search-field-container']}>
                <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search for Characters by Name' className={styles['input-search-field']} />
                <button onClick={handleSearch} className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {characterAndComicsStore.characters.map(character => (
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
            <hr className={styles['hr-bottom']} />
            <Pagination 
                totalItems={totalCharacters}
                itemsPerPage={characterLimit}
                currentPage={currentCharacterPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
});

export default Characters

