import { ENDPOINTS } from '../config';

function buildImgUrl(id) {
  return `${ENDPOINTS.IMAGES}/${id}.png`;
}

export default class Card {
  constructor(apiData) {
    const {
      cardId,
      cardSet,
      name,
      type,
      text,
      playerClass,
      attack,
      health,
      rarity,
      faction,
      cost,
      elite,
      race,
      flavor,
      durability
    } = apiData;

    this._id = cardId;
    this._set = cardSet;
    this._name = name;
    this._type = type;
    this._text = text;
    this._playerClass = playerClass;
    this._attack = attack;
    this._health = health;
    this._rarity = rarity;
    this._faction = faction;
    this._cost = cost;
    this._elite = elite;
    this._race = race;
    this._flavor = flavor;
    this._durability = durability;
    this._img = buildImgUrl(cardId);
  }

  get id() {
    return this._id;
  }

  get img() {
    return this._img;
  }

  get name() {
    return this._name;
  }

  get set() {
    return this._set;
  }

  get type(){
    return this._type;
  }

  get cost() {
    return this._cost;
  }

  get text() {
    return this._text;
  }

  get playerClass(){
    return this._playerClass;
  }
}
