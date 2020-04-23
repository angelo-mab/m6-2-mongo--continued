# 5.1.3 Immer

---

In Redux, store updates **must be** immutable.

---

Spot and fix the error:

```js
const initialState = {
  name: 'Arnold',
  headShape: 'football',
  bestFriend: null,
};

function reducer(state, action) {
  if (action.type === 'MAKE_FRIEND') {
    state.bestFriend = action.gerald.firstName;
    return state;
  }
}

//the return only sends back [ state.bestFriend = action.gerald.firstName; ] and not the whole state
state = {
  bestFriend: action.gerald.firstName;
}

function reducer(state, action) {
  if (action.type === 'MAKE_FRIEND') {
    ...
    state.bestFriend = action.gerald.firstName;
    return state;
  }
}

// this will return the whole state and the update
```

---

# Exercise

Fix mutability issues

---

```js
const initialState = {
  burgerToppings: ['lettuce', 'tomato', 'mayo'],
};

function reducer(state, action) {
  if (action.type === 'ADD_KETCHUP') {
    state.burgerToppings.push('ketchup');
    return state;
  }
}
```

---

```js

//fix!
// 1. spread state
// 2. spread the burgerTopping state
const initialState = {
  burgerToppings: ['lettuce', 'tomato', 'mayo'],
};

function reducer(state, action) {
  if (action.type === 'ADD_KETCHUP') {
    state.burgerToppings.push('ketchup');
    return {
      ...state,
      burgerToppings: [
        ...state.burgerToppings,
        'ketchup'
      ]
    };
  }
}
```

---
<Timer />

```js
const initialState = {
  raceBeganAt: '2020-03-27T12:34:56.000Z',
  competitors: {
    orangers: {
      racers: {
        clementin: {},
        tangerin: {},
      },
    },
    teamGalactic: {
      racers: {
        speedy: {},
        rapidly: {},
        swiftly: {},
      },
    },
  },
};

function reducer(state, action) {
  if (action.type === 'REMOVE_RACER_FROM_TEAM') {
    const { teamId, racerName } = action;

    delete state.competitors[teamId].racers[racerName];

    return state;
  }
}
```

---

There has to be a better way!

---

# Immer

Immer lets you _use mutable methods_ without actually mutating the original state.

---

```js
import produce from 'immer';

const state = { hi: 5 };

// BAD: mutation
state.hi = 6;

// GOOD: fake mutation with Immer
const newState = produce(state, (draftState) => {
  draftState.hi = 6;
});

console.log(newState); // { hi: 6 }
console.log(state === newState); // false
```

---

Let's try this again:

```js
const initialState = {
  name: 'Arnold',
  headShape: 'football',
  bestFriend: null,
};

function reducer(state, action) {
  if (action.type === 'MAKE_FRIEND') {
    state.bestFriend = action.gerald.firstName;
    return state;
  }
}
```

---
```js
// hot fix
import produce from 'immer';

const initialState = {
  name: 'Arnold',
  headShape: 'football',
  bestFriend: null,
};

function reducer(state, action) {
  if (action.type === 'MAKE_FRIEND') {
    state.bestFriend = action.gerald.firstName;
    return produce(state, (draftState) => {
      draftState.bestFriend = action.gerald.firstName // this is the fix
    });
  }
}
```

---
## Exercises

Do it again, but with Immer!

---

```js
const initialState = {
  burgerToppings: ['lettuce', 'tomato', 'mayo'],
};

function reducer(state, action) {
  if (action.type === 'ADD_KETCHUP') {
    state.burgerToppings.push('ketchup');
    return state;
  }
}
```
---
```js
// hot fix
import produce from 'immer';

const initialState = {
  burgerToppings: ['lettuce', 'tomato', 'mayo'],
};

function reducer(state, action) {
  if (action.type === 'ADD_KETCHUP') {
    state.burgerToppings.push('ketchup');
    return produce(state, draftState => {
      draftState.burgerTopping.push('ketchup') // this is the fix
    });
  }
}
```
---
```js
const initialState = {
  raceBeganAt: '2020-03-27T12:34:56.000Z',
  competitors: {
    orangers: {
      racers: {
        clementin: {},
        tangerin: {},
      },
    },
    teamGalactic: {
      racers: {
        speedy: {},
        rapidly: {},
        swiftly: {},
      },
    },
  },
};

function reducer(state, action) {
  if (action.type === 'REMOVE_RACER_FROM_TEAM') {
    const { teamId, racerName } = action;

    delete state.competitors[teamId].racers[racerName];

    return state;
  }
}
```
---
```js

// hot fix
import produce from 'immer';

const initialState = {
  raceBeganAt: '2020-03-27T12:34:56.000Z',
  competitors: {
    orangers: {
      racers: {
        clementin: {},
        tangerin: {},
      },
    },
    teamGalactic: {
      racers: {
        speedy: {},
        rapidly: {},
        swiftly: {},
      },
    },
  },
};

function reducer(state, action) {
  if (action.type === 'REMOVE_RACER_FROM_TEAM') {
    const { teamId, racerName } = action;

    return produce(state, draftState => {
      delete state.competitors[teamId].racers[racerName];
    })
  }
}
```
---
Immer makes our lives _much_ easier.

Feel free to use it as much or as little as you want.
