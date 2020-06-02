import {getInfo, getCardsByClass} from "./utils/api.js";
import DeckBuilder from './classes/DeckBuilder';
import Card from "./classes/Card.js";

export default async function init() {

console.log("Saludos desde la PEC2");

//Deckbuilder
const info = await getInfo();
const deckBuilder = new DeckBuilder(info);
console.log("DeckBuilder:")
console.log(deckBuilder);

//Cartas por clase
const cardsByClass = await getCardsByClass('Hunter');
cardsByClass.forEach(element =>  deckBuilder.cards.push(new Card(element)));
console.log("Conjunto de cartas obtenido a través de getCardsByClass('Hunter'):");
console.table(deckBuilder.cards);

//Carta por Id
const firstCard = deckBuilder.cards[0].getCardId();
console.log(`Carta individual obtenida a través de getCardById('${firstCard}'):`);
console.log(deckBuilder.getCardById(firstCard));

//Llamada API (endpoint de cartas individuales):
// let cardById = await getCardById(deckBuilder.cards[0].getCardId());
// let card = processCards(cardById);
// console.log("Resultado de carta consultada por ID:")
// console.table(card)
      
}


//extra PEC3
//  deckBuilder.insertarCartaMazo(card);
//  deckBuilder.insertarCartaMazo(deckBuilder.cards[1]);
//  deckBuilder.eliminarCartaMazo(card);
//  deckBuilder.insertarCartaMazo(deckBuilder.cards[1]);

