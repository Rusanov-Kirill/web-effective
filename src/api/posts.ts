import axios from './helpers/axios.ts';
import { Post } from '../types/post.ts';

export default {
  async getCharactersList(): Promise<Post[]> {
    const response = await axios.get('/v1/public/characters');
    const charData = response.data;

    const fetchedData = charData.data.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      participatingIn: character.comics.items.map((comicData: any) => ({
        name: comicData.name,
        url: comicData.resourceURI
      }))
    }));

    console.log(fetchedData);
    return fetchedData;
  },

  async getComicsList(): Promise<Post[]> {
    const response = await axios.get('/v1/public/comics');
    const comData = response.data;

    const fetchedData = comData.data.results.map((comic: any) => ({
      id: comic.id,
      name: comic.title,
      description: comic.description,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      participatingIn: comic.characters.items.map((characterData: any) => ({
        name: characterData.name,
        url: characterData.resourceURI
      }))
    }));

    return fetchedData;
  },

  async getCharacterInfo(characterId: number): Promise<Post[]> {
    const response = await axios.get(`/v1/public/characters/${characterId}`);
    const characterData = response.data;

    const fetchedData = characterData.data.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      participatingIn: character.comics.items.map((comicData: any) => ({
        name: comicData.name,
        url: comicData.resourceURI
      }))
    }));

    return fetchedData;
  },

  async getComicInfo(comicId: number): Promise<Post[]> {
    const response = await axios.get(`/v1/public/comics/${comicId}`);
    const characterData = response.data;

    const fetchedData = characterData.data.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      participatingIn: character.comics.items.map((comicData: any) => ({
        name: comicData.name,
        url: comicData.resourceURI
      }))
    }));

    return fetchedData;
  },
}
