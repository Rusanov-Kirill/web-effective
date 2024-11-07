import axios from './helpers/axios.ts';
import { Post } from '../types/post.ts';
import { md5 } from 'js-md5';
import envs from '../config/environments.ts';

export default {
  async getCharactersList(): Promise<Post[]> {
    const response = await axios.get('/v1/public/characters', {
      params: {
        ts: Date.now(),
        apikey: envs.apiKey,
        hash: md5(`${Date.now()}${envs.apiPKey}${envs.apiKey}`)
      }
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
  }
}
