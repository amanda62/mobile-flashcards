// import AsyncStorage from "@react-native-community/async-storage";

// storeData = async () => {
//   try {
//     await AsyncStorage.setItem("@storage_Key", "stored value");
//   } catch (e) {
//     // saving error
//   }
// };

// getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@storage_Key");
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

// let user = null;
let lastQuizTime = null;
let decks = [
  {
    title: "React",
    color: "#66A182",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  {
    title: "JavaScript",
    color: "#F18805",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      },
      {
        question: ".find() vs. .some()",
        answer: `.find() returns the first item found. 
            .some() returns a boolean.  
            both expect a callback(x => x === y ) `
      }
    ]
  }
];

export function _setLastQuizTime() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      lastQuizTime = new Date();
      res(); //? does this need a response?
    }, 100);
  });
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res([...decks]), 200);
  });
}
export function _getDeck(id) {
  return new Promise((res, rej) =>
    setTimeout(() => {
      const deck = decks.find(_deck => _deck.title === id);
      deck ? res({ ...deck }) : rej(new Error("Deck not found"));
    }, 100)
  );
}

export function _createDeck(deck) {
  return new Promise((res, rej) => {
    const newDeck = {
      ...deck,
      questions: []
    };
    setTimeout(() => {
      decks = [...decks, newDeck];
      res({ ...newDeck }); //? does this need a response?
    }, 100);
  });
}

//card = {question: "", answer: ""}
export function _addCardToDeck(title, card) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = decks.map(deck =>
        deck.title === title
          ? { ...deck, questions: [...deck.questions, card] }
          : deck
      );
      res({ ...decks.find(deck => deck.title === title) });
    }, 100);
  });
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
