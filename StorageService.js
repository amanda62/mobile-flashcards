import { AsyncStorage } from "react-native";

const defaultDecks = [
  {
    title: "React",
    color: "#CBC5EA",
    cards: [
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
    color: "#96616B",
    cards: [
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

const DECKS_KEY = "mobile-flashcards/decks";
const QUIZ_REMINDER_KEY = "mobile-flashcards/reminderScheduled";

const getDecks = async () => {
  const deckStrings = await AsyncStorage.getItem(DECKS_KEY);
  return deckStrings ? JSON.parse(deckStrings) : defaultDecks;
};

//single line async functions automatically return a promise, and don't need async/await
const setDecks = async decks =>
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));

const getQuizReminder = async () =>
  await AsyncStorage.getItem(QUIZ_REMINDER_KEY);

const setQuizReminder = async value =>
  await AsyncStorage.setItem(QUIZ_REMINDER_KEY, JSON.stringify(value));

const clearQuizReminder = async () =>
  await AsyncStorage.removeItem(QUIZ_REMINDER_KEY);

export default {
  getDecks,
  setDecks,
  getQuizReminder,
  setQuizReminder,
  clearQuizReminder
};
