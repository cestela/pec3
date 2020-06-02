export const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
export const DATA_API_TOKEN = 'b3e1d58ff3msh830486f923b551ep16cc60jsnadd6090c0935';

const DATA_API = `https://${DATA_API_HOST}`;
const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x';

export const ENDPOINTS = {
  INFO: `${DATA_API}/info`,
  CLASSES: `${DATA_API}/cards/classes`,
  SETS: `${DATA_API}/cards/sets`,
  RACES: `${DATA_API}/cards/races`,
  QUALITIES: `${DATA_API}/cards/qualities`,
  TYPES: `${DATA_API}/cards/types`,
  FACTIONS: `${DATA_API}/cards/factions`,
  IMAGES: IMAGES_API
};
