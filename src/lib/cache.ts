import NodeCache from 'node-cache';


const DEFAULT = 60;
const cache = new NodeCache({ stdTTL: DEFAULT }); // TTL is 600 seconds

export const setCache = (key: string, value: any, ttl: number = DEFAULT): void => {
  cache.set(key, value);
};

export const getCache = (key: string): any | undefined => {
  return cache.get(key);
};