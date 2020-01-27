import StorageService from "./StorageService";

// let user = null;
// let lastQuizTime = null;
// let decks = null;

// export function _setLastQuizTime() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       lastQuizTime = new Date();
//       res(); //? does this need a response?
//     }, 100);
//   });
// }

//allows us to use Timeout in a synchronous way with async/await
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function _getDecks() {
  await delay(200);
  const decks = await StorageService.getDecks();
  return decks;
}

export async function _getDeck(title) {
  await delay(200);
  const decks = await StorageService.getDecks();
  const targetDeck = (decks || []).find(deck => deck.title === title);
  return targetDeck;
}

export async function _createDeck(deckDetails) {
  await delay(100);
  const decks = await StorageService.getDecks();
  await StorageService.setDecks([...decks, { ...deckDetails, questions: [] }]);
}

//card = {question: "", answer: ""}
export async function _addCardToDeck(title, card) {
  await delay(100);
  const decks = await StorageService.getDecks();
  const updatedDecks = decks.map(deck =>
    deck.title === title
      ? { ...deck, questions: [...deck.questions, card] }
      : deck
  );
  await StorageService.setDecks(updatedDecks);
}

// export function _deleteDeck(title) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             const deck = decks[title];
//             delete decks[title];
//             // decks = Object.keys(decks).filter(deck => decks.deck != decks[title]) //change back to objects?
//             res(deck);
//         }, 500)
//     })
// }
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
