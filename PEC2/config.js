const BASE_URI = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';

const INFO = '/info';
const CARDS = '/cards';
const CLASSES = '/classes'


export const ENDPOINT_INFO = BASE_URI + INFO;

export const ENDPOINT_CLASSES = BASE_URI + CARDS + CLASSES + '/';

export const ENDPOINT_CARD_ID = BASE_URI + CARDS +'/'
