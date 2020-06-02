import {ENDPOINT_INFO, ENDPOINT_CLASSES} from "../config.js"


const headers = new Headers();
headers.append('x-rapidapi-host', 'omgvamp-hearthstone-v1.p.rapidapi.com');
headers.append('x-rapidapi-key', 'b3e1d58ff3msh830486f923b551ep16cc60jsnadd6090c0935');

const clasesConsultadas = [];


export async function getEndpoint(url) {
  try{
    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    const apiData = await response.json();
    return apiData;
  }catch(err){
    console.log('fetch failed', err);
  }
}

export async function getInfo(){
  const apiData = await getEndpoint(ENDPOINT_INFO);
  return apiData
}

export async function getCardsByClass(clase){
  if(!(clasesConsultadas.includes(clase))){
    const apiData = await getEndpoint(ENDPOINT_CLASSES+clase);
    clasesConsultadas.push(clase);
    return apiData
  }

  return [];
}





 