import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import characterAndComicsStore from '../stores/CharactersAndComicsStore.ts';
import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import Loading from '../components/Loading.tsx';
import { REQUEST_LIMIT } from '../constants/constants.ts';
import useDebounce from '../hooks/useDebounce.ts';
import { VirtuosoGrid } from 'react-virtuoso';

const Characters: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = async () => {
        if (characterAndComicsStore.loading) return;

        const nextPage = characterAndComicsStore.currentCharacterPage + 1;
        const totalLoaded = characterAndComicsStore.characters.length;

        if (totalLoaded >= REQUEST_LIMIT) {
            setHasMore(false);
            return;
        }

        await characterAndComicsStore.getCharactersList(nextPage, debounceSearchQuery);
    };

    useEffect(() => {
        if (!debounceSearchQuery) {
            characterAndComicsStore.resetCharacters();
            setHasMore(true);
            characterAndComicsStore.getCharactersList(1);
        } else {
            characterAndComicsStore.resetCharacters();
            setHasMore(true);
            characterAndComicsStore.getCharactersList(1, debounceSearchQuery);
        }
    }, [debounceSearchQuery]);

    useEffect(() => {
        characterAndComicsStore.getCharactersList(1);
    }, []);

    const handleSearch = () => {
        if (!searchQuery) {
            characterAndComicsStore.resetCharacters();
            setHasMore(true);
            characterAndComicsStore.getCharactersList(1);
        } else {
            characterAndComicsStore.resetCharacters();
            setHasMore(true);
            characterAndComicsStore.getCharactersList(1, searchQuery);
        }
    };

    if (characterAndComicsStore.loading && characterAndComicsStore.characters.length === 0) {
        return <Loading />;
    }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Characters</h1>
            <div className={styles['search-field-container']}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Characters by Name"
                    className={styles['input-search-field']}
                />
                <button className={styles['search-button']} onClick={handleSearch}>
                    SEARCH
                </button>
            </div>
            <hr className={styles.hr} />

            <VirtuosoGrid
                useWindowScroll
                style={{ height: '80vh', width: '100%' }}
                data={characterAndComicsStore.characters}
                endReached={loadMoreData} 
                overscan={200} 
                components={{
                    List: React.forwardRef(({ style, children }, ref) => (
                        <div ref={ref} style={style} className={styles.cards}>
                            {children}
                        </div>
                    )),
                    Item: ({ children }) => <div className={styles.card}>{children}</div>,
                    Footer: () => (hasMore ? <Loading /> : <div></div>), 
                }}
                itemContent={(index, character) => (
                    <Card
                        key={character.id}
                        id={character.id}
                        image={character.image}
                        name={character.name}
                        description={character.description}
                        link={`/characters/${character.id}`}
                        participatingIn={character.participatingIn?.map(
                            (comic) => comic.name
                        )}
                    />
                )}
            />

            <hr className={styles['hr-bottom']} />
        </div>
    );
});

export default Characters;
