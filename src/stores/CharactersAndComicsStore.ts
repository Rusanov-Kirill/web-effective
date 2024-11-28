import { action, makeAutoObservable, observable } from 'mobx';
import api from '../api/posts.ts';
import { Post } from '../types/post.ts';
import { REQUEST_LIMIT } from '../constants/constants.ts';

class CharactersAndComicsStore {
    @observable
    characters: Post[] = [];

    @observable
    comics: Post[] = [];

    @observable
    selectedComic: Post | null = null;

    @observable
    selectedCharacter: Post | null = null;

    @observable
    loading: boolean = false;

    @observable
    currentCharacterPage: number = 1;

    @observable
    characterLimit: number = 6;

    @observable
    currentComicPage: number = 1;

    @observable
    comicLimit: number = 6;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async getCharactersList(page: number = this.currentCharacterPage, nameStartsWith?: string) {
        this.loading = true;
        const offset = (page - 1) * this.characterLimit;
        const remainingItems = REQUEST_LIMIT - this.characters.length;
        const limit = Math.min(this.characterLimit, remainingItems);

        if (remainingItems <= 0) {
            this.loading = false;
            return;
        }

        try {
            const response = await api.getCharactersList(offset, limit, nameStartsWith);

            const uniqueCharacters = response.filter(
                (newChar) => !this.characters.some((existingChar) => existingChar.id === newChar.id)
            );

            this.characters = [...this.characters, ...uniqueCharacters];
            this.currentCharacterPage = page;
        } catch (error) {
            console.error('Error fetching characters list:', error);
        } finally {
            this.loading = false;
        }
    }

    @action
    resetCharacters() {
        this.characters = [];
        this.currentCharacterPage = 1;
    }


    @action
    async getCharacterInfo(characterId: number) {
        this.loading = true;
        try {
            const response = await api.getCharacterInfo(characterId);
            this.selectedCharacter = response[0];
        } catch (error) {
            console.error('Error fetching character info:', error);
        } finally {
            this.loading = false;
        }
    }

    @action
    async getComicsList(page: number = this.currentComicPage, titleStartsWith?: string) {
        this.loading = true;
        const offset = (page - 1) * this.comicLimit;
        const remainingItems = REQUEST_LIMIT - this.comics.length;
        const limit = Math.min(this.comicLimit, remainingItems);

        if (remainingItems <= 0) {
            this.loading = false;
            return;
        }

        try {
            const response = await api.getComicsList(offset, limit, titleStartsWith);

            const uniqueComics = response.filter(
                (newComic) => !this.comics.some((existingComic) => existingComic.id === newComic.id)
            );

            this.comics = [...this.comics, ...uniqueComics];
            this.currentComicPage = page;
        } catch (error) {
            console.error('Error fetching comics list:', error);
        } finally {
            this.loading = false;
        }
    }

    @action
    resetComics() {
        this.comics = [];
        this.currentComicPage = 1;
    }


    @action
    async getComicInfo(comicId: number) {
        this.loading = true;
        try {
            const response = await api.getComicInfo(comicId);
            this.selectedComic = response[0];
        } catch (error) {
            console.error('Error fetching comic info:', error);
        } finally {
            this.loading = false;
        }
    }
}

const charactersAndComicsStore = new CharactersAndComicsStore();
export default charactersAndComicsStore;
