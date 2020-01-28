import _DATA from "./_DATA";
import { useState, useEffect } from "react";

export function useDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    (async () => {
      const _decks = await _DATA._getDecks();
      setDecks(_decks);
    })();
  }, []);

  return decks;
}

export function useDeck(navigation) {
  const [deck, setDeck] = useState();

  useEffect(() => {
    (async () => {
      const title = navigation.getParam("title");
      const _deck = await _DATA._getDeck(title);
      setDeck(_deck);
    })();
  }, [navigation]);

  return deck;
}
