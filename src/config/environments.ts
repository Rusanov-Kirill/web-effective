const envs = import.meta.env;

export default {
   apiKey: envs.VITE_MARVEL_PUBLIC_API_KEY,
   apiHash: envs.VITE_MARVEL_API_HASH
};