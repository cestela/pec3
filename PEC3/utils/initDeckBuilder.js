import { requestInfo } from '../api';
import DeckBuilderSingleton from '../Classes/DeckBuilder';

export default async function initDeckBuilder() {
  const info = await requestInfo();

  DeckBuilderSingleton.init(info);
}
