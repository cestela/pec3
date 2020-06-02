import DeckBuilderSingleton  from '../Classes/DeckBuilder';

export function createSelector(selector, options) {
    const selectEl = document.createElement('select');
    selectEl.name = selector;
    selectEl.className = 'select-css';
    selectEl.appendChild(createSelectorOption(`All ${selector}`));
    options.forEach(option => {
       selectEl.appendChild(createSelectorOption(option));
    })
    return selectEl;
}

function createSelectorOption(option){
    const optionEl = document.createElement('option');
    const optionText = document.createTextNode(option);
    optionEl.value = option;
    optionEl.appendChild(optionText);
    return optionEl;
}

export function createImage(card){
    const imgEl = document.createElement('img');
    imgEl.src = card.img;
    imgEl.alt = `Imagen de la carta ${card.name}`;
    imgEl.title = card.id;
    imgEl.onerror = () => imgEl.src = "http://www.josepserra.com/web/uoc/nocard.png";
    return imgEl;
}

export function saveCardToDeck(cardId){
    const clickedCard = DeckBuilderSingleton.getCardsById(cardId);
    const ulStats = document.querySelector('#hearthStone_cardSummaryStats');
    const ulDeck = document.querySelector('#hearthStone_deckBuilderCards');
    if(!DeckBuilderSingleton.deck.includes(clickedCard)){
        DeckBuilderSingleton.deck.push(clickedCard);
        const liEl = document.createElement('li');
        const liText = document.createTextNode(clickedCard.name);
        liEl.appendChild(liText);
        ulDeck.appendChild(liEl);
    }

    ulDeck.addEventListener("click", event => {
        ulDeck.removeChild(event.target);
        DeckBuilderSingleton.deck.pop(DeckBuilderSingleton.deck.filter(card  => {
            card.name == event.target.innerText;
        }))
        while (ulStats.firstChild) {
            ulStats.firstChild.remove();
        }    
    })


    ulDeck.addEventListener("mouseover", event => {
        const mouseOverCard = DeckBuilderSingleton.deck.filter(card => card.name == event.target.innerText);
        const fieldsToShow = (({ id, name, set, type, cost, text, playerClass }) => ({ id, name, set, type, cost, text, playerClass}))(mouseOverCard[0]);
        for(var key in fieldsToShow) {
            console.log(key + fieldsToShow[key]);
            var value = fieldsToShow[key];
            const liEl = document.createElement('li');
            const liText = document.createTextNode(`${key}: ${value}`);
            liEl.appendChild(liText);
            ulStats.appendChild(liEl);
        }
    })

    ulDeck.addEventListener("mouseout",  () => {
        while (ulStats.firstChild) {
            ulStats.firstChild.remove();
        }   
        console.log(ulStats); 
    })


}



