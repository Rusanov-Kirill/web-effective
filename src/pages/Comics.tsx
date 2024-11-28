import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import characterAndComicsStore from '../stores/CharactersAndComicsStore.ts';
import styles from './modules/CharactersAndComics.module.css';
import Card from '../components/Card.tsx';
import Loading from '../components/Loading.tsx';
import { REQUEST_LIMIT } from '../constants/constants.ts';
import useDebounce from '../hooks/useDebounce.ts';
import { VirtuosoGrid } from 'react-virtuoso';

const Comics: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = async () => {
        if (characterAndComicsStore.loading) return;

        const nextPage = characterAndComicsStore.currentComicPage + 1;
        const totalLoaded = characterAndComicsStore.comics.length;

        if (totalLoaded >= REQUEST_LIMIT) {
            setHasMore(false);
            return;
        }

        await characterAndComicsStore.getComicsList(nextPage, debounceSearchQuery);
    };

    useEffect(() => {
        if (!debounceSearchQuery) {
            characterAndComicsStore.resetComics();
            setHasMore(true);
            characterAndComicsStore.getComicsList(1);
        } else {
            characterAndComicsStore.resetComics();
            setHasMore(true);
            characterAndComicsStore.getComicsList(1, debounceSearchQuery);
        }
    }, [debounceSearchQuery]);

    useEffect(() => {
        characterAndComicsStore.getComicsList(1);
    }, []);

    const handleSearch = () => {
        if (!searchQuery) {
            characterAndComicsStore.resetComics();
            setHasMore(true);
            characterAndComicsStore.getComicsList(1);
        } else {
            characterAndComicsStore.resetComics();
            setHasMore(true);
            characterAndComicsStore.getComicsList(1, searchQuery);
        }
    };

    if (characterAndComicsStore.loading && characterAndComicsStore.comics.length === 0) {
        return <Loading />;
    }

    return (
        <div className={styles['page-container']}>
            <h1 className={styles.title}>Comics</h1>
            <div className={styles['search-field-container']}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Comics by Name"
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
                data={characterAndComicsStore.comics}
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
                itemContent={(index, comic) => (
                    <Card
                        key={comic.id}
                        id={comic.id}
                        image={comic.image}
                        name={comic.name}
                        description={comic.description}
                        link={`/comics/${comic.id}`}
                        participatingIn={comic.participatingIn?.map(
                            (character) => character.name
                        )}
                    />
                )}
            />

            <hr className={styles['hr-bottom']} />
        </div>
    );
});

export default Comics;
