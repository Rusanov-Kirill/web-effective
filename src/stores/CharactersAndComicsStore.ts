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
        this.currentCharacterPage = page;
        const offset = (page - 1) * this.characterLimit;

        const remainingItems = REQUEST_LIMIT - offset;
        const limit = remainingItems > 0 ? Math.min(this.characterLimit, remainingItems) : 0;

        try {
            const response = await api.getCharactersList(offset, limit, nameStartsWith);
            this.characters = response;
        } catch (error) {
            console.error('Error fetching characters list:', error);
        } finally {
            this.loading = false;
        }
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
        this.currentComicPage = page;
        const offset = (page - 1) * this.comicLimit;

        const remainingItems = REQUEST_LIMIT - offset;
        const limit = remainingItems > 0 ? Math.min(this.comicLimit, remainingItems) : 0;

        try {
            const response = await api.getComicsList(offset, limit, titleStartsWith);
            this.comics = response;
        } catch (error) {
            console.error('Error fetching comics list:', error);
        } finally {
            this.loading = false;
        }
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

    @action
    setCharacterPage(page: number) {
        this.currentCharacterPage = page;
        this.getCharactersList(page);
    }

    @action
    setComicPage(page: number) {
        this.currentComicPage = page;
        this.getComicsList(page);
    }

    @action
    resetCharacterPage() {
        this.currentCharacterPage = 1;
        this.getCharactersList(1); 
    }

    @action
    resetComicPage() {
        this.currentComicPage = 1;
        this.getComicsList(1); 
    }
}

const charactersAndComicsStore = new CharactersAndComicsStore();
export default charactersAndComicsStore;
