export class DeckBuilder {
  init(apiData) {
    const { classes, sets, types, factions, qualities, races } = apiData;

    this._info = { classes, sets, types, factions, qualities, races };
    this._cards = {
      all: new Map(),
      byClass: {},
      byFaction: {},
      byQuality: {},
      byRace: {},
      bySet: {},
      byType: {}
    };
    this._deck = [];
  }

  get info() {
    return this._info;
  }

  get cards() {
    return this._cards;
  }

  get deck() {
    return this._deck;
  }

  addCardToDeck(){

  }

  removeCardFromDeck(){

  }

  getCardsById(id) {
    return this._cards.all.get(id);
  }

  getCardsByClass(cardClass) {
    if (this._cards.byClass.hasOwnProperty(cardClass)) {
      return this._cards.byClass[cardClass];
    }
  }

  setCardsByClass(cardClass, cardsByClass) {
    this._cards.all = new Map([...this._cards.all, ...cardsByClass]);
    this._cards.byClass[cardClass] = cardsByClass.keys();
  }

  getCardsBySet(cardSet){
    if (this._cards.bySet.hasOwnProperty(cardSet)) {
      return this._cards.bySet[cardSet];
    }
  }

  setCardsBySet(cardSet, cardsBySet){
    this._cards.all = new Map([...this._cards.all, ...cardsBySet]);
    this._cards.bySet[cardSet] = cardsBySet.keys();
  }

  getCardsByType(cardType){
    if (this._cards.byType.hasOwnProperty(cardType)) {
      return this._cards.byType[cardType];
    }
  }

  setCardsByType(cardType, cardsByType){
    this._cards.all = new Map([...this._cards.all, ...cardsByType]);
    this._cards.byType[cardType] = cardsByType.keys();
  }

  getCardsByFaction(cardFaction){
    if (this._cards.byFaction.hasOwnProperty(cardFaction)) {
      return this._cards.byFaction[cardFaction];
    }
  }

  setCardsByFaction(cardFaction, cardsByFaction){
    this._cards.all = new Map([...this._cards.all, ...cardsByFaction]);
    this._cards.byFaction[cardFaction] = cardsByFaction.keys();
  }

  getCardsByQuality(cardQuality){
    if (this._cards.byQuality.hasOwnProperty(cardQuality)) {
      return this._cards.byQuality[cardQuality];
    }
  }

  setCardsByQuality(cardQuality, cardsByQuality){
    this._cards.all = new Map([...this._cards.all, ...cardsByQuality]);
    this._cards.byQuality[cardQuality] = cardsByQuality.keys();
  }

  getCardsByRace(cardRace){
    if (this._cards.byRace.hasOwnProperty(cardRace)) {
      return this._cards.byRace[cardRace];
    }
  }

  setCardsByRace(cardRace, cardsByRace){
    this._cards.all = new Map([...this._cards.all, ...cardsByRace]);
    this._cards.byRace[cardRace] = cardsByRace.keys();
  }
}

const DeckBuilderSingleton = new DeckBuilder();

export default DeckBuilderSingleton;
