import axios from 'axios';
import envs from '../../config/environments.ts'
import { md5 } from 'js-md5';

const instance = axios.create({
  baseURL: 'http://gateway.marvel.com'
});

instance.interceptors.request.use(config => {
  const ts = Date.now();
  const hash = md5(`${ts}${envs.apiPKey}${envs.apiKey}`);

  config.params = {
    ...config.params,
    ts,
    apikey: envs.apiKey,
    hash,
  };

  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;