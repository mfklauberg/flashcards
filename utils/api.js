import guid from './guid';
import { AsyncStorage } from 'react-native';

const error = (message) => {
  throw `[FLASHCARDS]: ${message}`;
};

const DATA = '@flashcards/data';
const SETTINGS = '@flashcards/settings';

const CARDS = `${DATA}/cards`;
const DECKS = `${DATA}/decks`;

const USE_TIMER = `${SETTINGS}/timer`;
const TIMER_DURATION = `${SETTINGS}/timer_duration`;

function set(key, items) {
  return AsyncStorage.setItem(key, JSON.stringify(items));
}

function get(key) {
  return AsyncStorage.getItem(key).then((items) => {
    if (items === null) {
      return [];
    }

    return JSON.parse(items);
  });
}

function getItem(key, id) {
  const err = () => error(`Item with id ${id} not found.`);

  return get(key).then((items) => {
    if (items.length === 0) {
      err();
    }

    const item = items.find((item) => item.id === id);

    if (!item) {
      err();
    }

    return item;
  });
}

function addItem(key, parameters) {
  const item = {
    id: guid(),
    ...parameters
  };

  return get(key).then((items) => {
    return set(key, [...items, item]);
  });
}

function updateItem(key, id, parameters) {
  const err = () => error(`Item with id ${id} not found.`);

  return get(key).then((items) => {
    if (items.length === 0) {
      err();
    }

    const index = items.findIndex((item) => item.id === id);

    if (index < 0) {
      err();
    }

    items[index] = {
      ...items[index],
      ...parameters
    };

    return set(key, items);
  });
}

function removeItem(key, id) {
  return get(key).then((items) => {
    return set(key, items.filter((item) => item.id !== id));
  });
}

export const getCards = () => get(CARDS);
export const getDecks = () => get(DECKS);

export const getCard = (id) => getItem(CARDS, id);
export const getDeck = (id) => getItem(DECKS, id);

export const addCard = (parameters) => addItem(CARDS, parameters);
export const addDeck = (parameters) =>
  addItem(DECKS, { ...parameters, cards: [] });

export const updateCard = (id, parameters) => updateItem(CARDS, id, parameters);
export const updateDeck = (id, parameters) => updateItem(DECKS, id, parameters);

export const removeCard = (id) => {
  removeItem(CARDS, id);

  return getDecks()
    .then((decks) => decks.filter((deck) => deck.cards.includes(id)))
    .then((decks) => {
      return decks.forEach((deck) => {
        const cards = deck.cards.filter((card) => card !== id);

        updateDeck(deck.id, { ...deck, cards });
      });
    });
};

export const removeDeck = (id) => removeItem(DECKS, id);

function clear() {
  AsyncStorage.multiRemove([CARDS, DECKS]);
}
