import { ENDPOINTS, DATA_API_HOST, DATA_API_TOKEN } from './config';

const headers = new Headers();
headers.append('x-rapidapi-host', DATA_API_HOST);
headers.append('x-rapidapi-key', DATA_API_TOKEN);

async function getEndpoint(url) {
  try {
    const response = await fetch(url, { method: 'GET', headers });
    const apiData = await response.json();

    return apiData;
  } catch (err) {
    console.log('fetch failed', err);
  }
}

export async function requestInfo() {
  const apiData = await getEndpoint(ENDPOINTS.INFO);
  return apiData;
}

export async function requestCardsByClass(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.CLASSES}/${option}`);
  return apiData;
}
export async function requestCardsByRace(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.RACES}/${option}`);
  return apiData;
}
export async function requestCardsByType(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.TYPES}/${option}`);
  return apiData;
}
export async function requestCardsByFaction(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.FACTIONS}/${option}`);
  return apiData;
}

export async function requestCardsByQuality(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.QUALITIES}/${option}`);
  return apiData;
}

export async function requestCardsBySet(option) {
  const apiData = await getEndpoint(`${ENDPOINTS.SETS}/${option}`);
  return apiData;
}


