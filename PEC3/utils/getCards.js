import DeckBuilderSingleton from '../Classes/DeckBuilder';
import Card from '../Classes/Card';
import { requestCardsByClass, requestCardsByFaction, requestCardsByQuality, requestCardsByRace, requestCardsBySet, requestCardsByType} from '../api';

const ACTION_BY_SELECTOR_NAME = {
  classes: getCardsByClass,
  types: getCardsByType,
  races: getCardsByRace,
  qualities: getCardsByQuality,
  factions: getCardsByFaction
};

export async function getCardsByClass(cardClass) {
  const localCardsByClass = DeckBuilderSingleton.getCardsByClass(cardClass);
  if (localCardsByClass) {
    return localCardsByClass;
  }

  const apiData = await requestCardsByClass(cardClass);
  const cardsByClass = new Map();

  apiData.forEach(cardData => cardsByClass.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsByClass(cardClass, cardsByClass);
}

export async function getCardsByType(cardType) {
  const localCardsByType = DeckBuilderSingleton.getCardsByType(cardType);

  if (localCardsByType) {
    return localCardsByType;
  }

  const apiData = await requestCardsByType(cardType);
  const cardsByType = new Map();

  apiData.forEach(cardData => cardsByType.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsByType(cardType, cardsByType);
}

export async function getCardsByRace(cardRace) {
  const localCardsByRace = DeckBuilderSingleton.getCardsByRace(cardRace);

  if (localCardsByRace) {
    return localCardsByRace;
  }

  const apiData = await requestCardsByRace(cardRace);
  const cardsByRace = new Map();

  apiData.forEach(cardData => cardsByRace.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsByRace(cardRace, cardsByRace);
}

export async function getCardsBySet(cardSet) {
  const localCardsBySet = DeckBuilderSingleton.getCardsBySet(cardSet);

  if (localCardsBySet) {
    return localCardsBySet;
  }

  const apiData = await requestCardsBySet(cardSet);
  const cardsBySet = new Map();

  apiData.forEach(cardData => cardsBySet.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsBySet(cardSet, cardsBySet);
}

export async function getCardsByQuality(cardQuality) {
  const localCardsByQuality = DeckBuilderSingleton.getCardsByQuality(cardQuality);

  if (localCardsByQuality) {
    return localCardsByQuality;
  }

  const apiData = await requestCardsByQuality(cardQuality);
  const cardsByQuality = new Map();

  apiData.forEach(cardData => cardsByQuality.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsByQuality(cardQuality, cardsByQuality);
}

export async function getCardsByFaction(cardFaction) {
  const localCardsByFaction = DeckBuilderSingleton.getCardsByFaction(cardFaction);

  if (localCardsByFaction) {
    return localCardsByFaction;
  }

  const apiData = await requestCardsByFaction(cardFaction);
  const cardsByFaction = new Map();

  apiData.forEach(cardData => cardsByFaction.set(cardData.cardId, new Card(cardData)));
  DeckBuilderSingleton.setCardsByFaction(cardFaction, cardsByFaction);
}

export async function getCardsBySelector(event){
  const { name, value } = event.target;
  const getCardsMethod = ACTION_BY_SELECTOR_NAME[name];
  getCardsMethod(value);
}
