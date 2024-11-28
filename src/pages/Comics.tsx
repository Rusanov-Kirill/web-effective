import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import characterAndComicsStore from '../stores/CharactersAndComicsStore.ts';
import Loading from '../components/Loading.tsx';
import Pagination from '../components/Pagination.tsx';
import { REQUEST_LIMIT } from '../constants/constants.ts';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce.ts';

const Comics: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery);

    useEffect(() => {
        if (debounceSearchQuery) {
            characterAndComicsStore.getComicsList(1, debounceSearchQuery); 
        }
    }, [debounceSearchQuery]);

    const handleSearch = () => {
        characterAndComicsStore.getComicsList(1, searchQuery); 
    };

    const justifyContent = characterAndComicsStore.comics.length % 6 === 0 ? 'space-between' : 'flex-start';

    const { currentComicPage, comicLimit } = characterAndComicsStore;
    const totalComics = REQUEST_LIMIT;

    useEffect(() => {
        characterAndComicsStore.resetComicPage();
    }, []);

    const handlePageChange = (page: number) => {
        characterAndComicsStore.setComicPage(page);
    };

    if (characterAndComicsStore.loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Comics</h1>
            <div className={styles['search-field-container']}>
                <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search for Comics by Name' className={styles['input-search-field']} />
                <button onClick={handleSearch} className={styles['search-button']}>SEARCH</button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.cards} style={{ justifyContent }}>
                {characterAndComicsStore.comics.map(comic => (
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
            <hr className={styles['hr-bottom']} />
            <Pagination
                totalItems={totalComics}
                itemsPerPage={comicLimit}
                currentPage={currentComicPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
});

export default Comics