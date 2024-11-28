const envs = import.meta.env;

export default {
   apiKey: envs.VITE_MARVEL_PUBLIC_API_KEY,
   apiPKey: envs.VITE_MARVEL_API_PRIVATE_KEY
};