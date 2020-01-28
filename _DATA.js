import StorageService from "./StorageService";
//AsyncStorage.mergeItem??, removeItem
//https://facebook.github.io/react-native/docs/asyncstorage.html#methods

//allows us to use Timeout in a synchronous way with async/await
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function _setQuizLog() {
  await delay(100);
  const date = new Date();
  await StorageService.setQuizLog(date);
}

async function _getDecks() {
  await delay(200);
  const decks = await StorageService.getDecks();
  return decks;
}

async function _getDeck(title) {
  await delay(200);
  const decks = await StorageService.getDecks();
  const targetDeck = (decks || []).find(deck => deck.title === title);
  return targetDeck;
}

async function _createDeck(deckDetails) {
  await delay(100);
  const decks = await StorageService.getDecks();
  await StorageService.setDecks([...decks, { ...deckDetails, cards: [] }]);
}

//newCard = {question: "", answer: ""}
async function _addCardToDeck(title, newCard) {
  await delay(100);
  const decks = await StorageService.getDecks();
  const updatedDecks = decks.map(deck =>
    deck.title === title ? { ...deck, cards: [...deck.cards, newCard] } : deck
  );
  await StorageService.setDecks(updatedDecks);
}

async function _deleteDeck(title) {
  await delay(500);
  const decks = await StorageService.getDecks();
  const updatedDecks = decks.filter(deck => deck.title !== title);
  await StorageService.setDecks(updatedDecks);
}

export default {
  _getDecks,
  _getDeck,
  _createDeck,
  _addCardToDeck,
  _deleteDeck,
  _setQuizLog
};

// TODO
// export function _deleteCard(title, card) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             decks = {
//                 ...decks,
//                 [title]: {
//                     ...decks[title],
//                     questions:
//                         decks[title].questions.filter(question => question != card) //by reference
//                     //cards need an id - then redo this
//                 }
//             }
//             res(decks[title]);
//         }, 500)
//     })
// }
