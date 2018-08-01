// based on https://github.com/react-navigation/react-navigation/issues/922#issuecomment-304827787

import guid from './guid';

const subscriptions = {};

export const subscribe = (eventName, fn) => {
  if (!subscriptions.hasOwnProperty.call(subscriptions, eventName)) {
    subscriptions[eventName] = {};
  }

  const uid = guid();
  subscriptions[eventName][uid] = fn;

  return () => delete subscriptions[eventName][uid];
};

export const notify = (eventName, args) => {
  if (!subscriptions.hasOwnProperty.call(subscriptions, eventName)) {
    return;
  }

  Object.keys(subscriptions[eventName]).forEach((key) =>
    subscriptions[eventName][key](args)
  );
};
