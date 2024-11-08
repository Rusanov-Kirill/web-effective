import axios from './helpers/axios.ts';
import { Post } from '../types/post.ts';
import { toast } from 'react-toastify';

export default {
  async getCharactersList(offset: number, limit: number, nameStartsWith?: string): Promise<Post[]> {
    try {
      const response = await axios.get('/v1/public/characters', {
        params: { offset, limit, ...(nameStartsWith ? { nameStartsWith } : {}) }
      });
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

      return fetchedData;
    } catch (error) {
      toast.error('Failed to fetch characters list');
      throw error;
    }
  },

  async getComicsList(offset: number, limit: number, titleStartsWith?: string): Promise<Post[]> {
    try {
      const response = await axios.get('/v1/public/comics', {
        params: { offset, limit, ...(titleStartsWith ? { titleStartsWith } : {}) }
      });
      console.log(response.data);
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
    } catch (error) {
      toast.error('Failed to fetch comics list');
      throw error;
    }
  },

  async getCharacterInfo(characterId: number): Promise<Post[]> {
    try {
      const response = await axios.get(`/v1/public/characters/${characterId}`);
      const characterData = response.data;

      const fetchedData = await Promise.all(
        characterData.data.results.map(async (character: any) => {
          const participatingIn = await Promise.all(
            character.comics.items.map(async (comicData: any) => {
              const comicResponse = await axios.get(comicData.resourceURI);
              const comicDetails = comicResponse.data.data.results[0];

              return {
                id: comicDetails.id,
                name: comicDetails.title,
              };
            })
          );

          return {
            id: character.id,
            name: character.name,
            description: character.description,
            image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            participatingIn: participatingIn,
          };
        })
      );

      return fetchedData;
    } catch (error) {
      toast.error('Failed to fetch character info');
      throw error;
    }
  },

  async getComicInfo(comicId: number): Promise<Post[]> {
    try {
      const response = await axios.get(`/v1/public/comics/${comicId}`);
      const comData = response.data;

      const fetchedData = await Promise.all(
        comData.data.results.map(async (comic: any) => {
          const participatingIn = await Promise.all(
            comic.characters.items.map(async (characterData: any) => {
              const characterResponse = await axios.get(characterData.resourceURI);
              const characterDetails = characterResponse.data.data.results[0];

              return {
                id: characterDetails.id,
                name: characterDetails.name,
                description: characterDetails.description,
                image: `${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`,
              };
            })
          );

          return {
            id: comic.id,
            name: comic.title,
            description: comic.description,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            participatingIn: participatingIn,
          };
        })
      );

      return fetchedData;
    } catch (error) {
      toast.error('Failed to fetch comic info');
      throw error;
    }
  },
}
