export default class Card {
  constructor(data) {
    const{cardId, 
      dbfId, 
      name,
      cardSet,
      type,
      faction,
      rarity,
      cost,
      attack,
      health,
      durability,
      armor,
      text,
      inPlayText,
      flavor,
      artist,
      collectible,
      elite,
      race,
      playerClass,
      multiClassGroup,
      classes,
      howToGet,
      howToGetGold,
      imgGold,
      locale,
      mechanics
     } = data;

    this.cardId = cardId;
    this.dbfId = dbfId;
    this.playerClass = playerClass;
    this.faction = faction;
    this.flavor = flavor;
    this.rarity = rarity;
    this.cost = cost;
    this.attack = attack;
    this.durability = durability;
    this.armor = armor;
    this.inPlayText = inPlayText;
    this.artist = artist;
    this.collectible = collectible;
    this.elite = elite;
    this.race = race;
    this.multiClassGroup = multiClassGroup;
    this.classes = classes;
    this.howToGet = howToGet;
    this.howToGetGold = howToGetGold;
    this.mechanics = mechanics;
    this.name = name;
    this.cardSet = cardSet;
    this.type = type;
    this.health = health;
    this.text = text;
    this.imgGold = imgGold;
    this.locale = locale;
    this.img = `https://art.hearthstonejson.com/v1/render/latest/${this.locale}/512x/${this.cardId}.png`
  }

  getCardId(){
    return this.cardId;
  }
}
