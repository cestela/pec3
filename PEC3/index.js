import initDeckBuilder from './utils/initDeckBuilder';
import { getCardsByClass, getCardsByFaction, getCardsBySelector } from './utils/getCards';
import DeckBuilderSingleton from './Classes/DeckBuilder';
import { createSelector, createImage, saveCardToDeck  } from './utils/renderManager';



const PLAYER_CLASS = 'Hunter';
const CARD_ID = 'DRGA_BOSS_38p';

export default async function init() {
  await initDeckBuilder();
  //await getCardsByClass(PLAYER_CLASS);
  //await getCardsByFaction(FACTION);

  // Date cuenta de que todos los datos presentados por consola se hace localmene
  // Una vez solicitados los datos a la API todas las consultas son a DeckBuilderSingleton
  // Cuando el usuario solicite datos consultaremos si existen en local antes de ir a la API

//Generación de selectores
  const sidebarSelectors = document.querySelector('#hearthStone_sidebarSelectors');
  const infoSelect = Object.keys(DeckBuilderSingleton.info);
  infoSelect.forEach(selector => {
    sidebarSelectors.appendChild(createSelector(selector, DeckBuilderSingleton.info[selector]));
  })
  sidebarSelectors.addEventListener('change',getCardsBySelector) ;


//Generación de imagenes
  /*const cardSelector = document.querySelector('#hearthStone_cardSelector');
  const cards = DeckBuilderSingleton.cards.all;
  cards.forEach(card => {
    cardSelector.appendChild(createImage(card));
  })
  
  cardSelector.addEventListener("click", (event) => {
     saveCardToDeck(event.target.title);
  } )
  */
  


  console.log('%cSelectores: ', 'color: #ccc; font-size: small');
  //console.dir(DeckBuilderSingleton.info);

  console.log(`%cResultado de getCardsByClass(${PLAYER_CLASS}):`, 'color: #ccc; font-size: small');
  //console.dir(DeckBuilderSingleton.getCardsByClass(PLAYER_CLASS));

  console.log(`%cResultado de getCardById(${CARD_ID}):`, 'color: #ccc; font-size: small');
  //console.dir(DeckBuilderSingleton.getCardsById(CARD_ID));

  console.log(DeckBuilderSingleton._cards);

}

