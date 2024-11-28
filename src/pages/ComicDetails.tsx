import styles from './modules/CharactersAndComicsDetails.module.css';
import Loading from '../components/Loading.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import comicStore from '../stores/CharactersAndComicsStore.ts';
import { Link } from 'react-router-dom';

const ComicDetails: React.FC = observer(() => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            comicStore.getComicInfo(parseInt(id));
        } else {
            console.error('No comic ID provided');
        }
    }, [id]);

    const comic = comicStore.selectedComic;

    if (comicStore.loading) {
        return (
            <Loading />
        );
    }

    if (!comic) {
        return <div>Comics not found</div>;
    }

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
                            {comic.participatingIn && comic.participatingIn.length > 0 ? (
                                comic.participatingIn.map((char, idx) => (
                                    <li className={styles.li} key={char.id || idx}>
                                        <Link className={styles.linkToRelated} to={`/characters/${char.id}`}>{char.name}</Link>
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
});

export default ComicDetails;