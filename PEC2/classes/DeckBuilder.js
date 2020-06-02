
export default class DeckBuilder {
  constructor(data) {
    const { classes, factions, qualities, races, sets, types } = data;
    this.classes = classes;
    this.sets = sets;
    this.types = types;
    this.factions = factions;
    this.qualities = qualities;
    this.races = races;
   // this.mazo = [];
    this.cards = [];
  }

  // PEC 3
  // insertarCartaMazo(carta){
  //   if(this.mazo.length < 1 || this.mazo == undefined || this.mazo.some(card => card.cardId !== carta.cardId)){
  //       this.mazo.push(carta)
  //       console.log("Carta insertada.")
  //       console.log(this.mazo);
  //     }
    
  // }

  // eliminarCartaMazo(carta){
  //   if(this.mazo.some(card => card.cardId === carta.cardId) && this.mazo.length >= 1){
  //     let index = this.mazo.indexOf(carta);
  //     if (index > -1){
  //       this.mazo.splice(index, 1);
  //       console.log("Carta eliminada.")
  //     console.log(this.mazo);
  //     }
  // }
  // }

  getCardById(cardId){
    try{
      let resultado = this.cards.filter(card => card.getCardId() == cardId);
      if(resultado.length > 0){
        return this.cards.filter(card => card.getCardId() == cardId);
      }else{
        throw(new Error(`Carta con id '${cardId}' no encontrada`));
      }
    }catch(e){
      console.error(e);
    }
    
  }

}
