import { action, makeAutoObservable, observable } from 'mobx';
import api from '../api/posts.ts';
import { Post } from '../types/post.ts';

class CharacterStore {
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

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async getCharactersList() {
        this.loading = true;
        try {
            const response = await api.getCharactersList();
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
    async getComicsList() {
        this.loading = true;
        try {
            const response = await api.getComicsList();
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
}

const characterStore = new CharacterStore();
export default characterStore;
