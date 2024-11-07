import axios from './helpers/axios.ts';
import { Post } from '../types/post.ts';
import envs from '../config/environments.ts';

const PostCharacter = {
  async getPostsList(): Promise<Post[]> {
    const response = await axios.get('/v1/public/characters', {
      params: {
        ts: 1,
        apikey: envs.apiKey,
        hash: envs.apiHash
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

export default PostCharacter;
