import guid from './guid';
import { AsyncStorage } from 'react-native';

const error = (message) => {
  throw `[FLASHCARDS]: ${message}`;
};

const DATA = '@flashcards/data';
const SETTINGS = '@flashcards/settings';

const DECKS = `${DATA}/decks`;
const NOTIFICATION = `${SETTINGS}/notification`;

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

export const getDecks = () => get(DECKS);

export const getDeck = (id) => getItem(DECKS, id);

export const addCard = (deckId, parameters) => {
  return getDeck(deckId).then((deck) => {
    const card = {
      id: guid(),
      ...parameters
    };

    const modifiedDeck = {
      ...deck,
      cards: [...deck.cards, card]
    };

    return updateDeck(deckId, modifiedDeck);
  });
};

export const addDeck = (parameters) =>
  addItem(DECKS, { ...parameters, cards: [] });

export const updateDeck = (id, parameters) => updateItem(DECKS, id, parameters);

export const removeDeck = (id) => removeItem(DECKS, id);

export const getNotification = () =>
  AsyncStorage.getItem(NOTIFICATION).then(JSON.parse);

export const setNotification = () =>
  AsyncStorage.setItem(NOTIFICATION, JSON.parse(true));

export const clearNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION);
};

function clear() {
  AsyncStorage.multiRemove([DECKS, NOTIFICATION]);
}
