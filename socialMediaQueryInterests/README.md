# Social Media: Query Interests

## Introduction

Your task is to implement the function `SocialNetworkQueries#findPotentialInterests(minimalScore)`
per the requirements and make tests pass.

```typescript
class SocialNetworkQueries {
    constructor(input: { fetchCurrentUser: () => Promise<User> });
    async findPotentialInterests(minimalScore: number): Promise<string[]>;
}

type Rating = {
    title: string;
    score: number;
};

type User = {
    id?: string;
    ratings?: Rating[];
    friends?: Array<{
        id?: string;
        ratings?: Rating[];
    }>;
};
```

## Problem Statement

For current user `SocialNetworkQueries#findPotentialInterests(minimalScore)` should return a `Promise` which resolves with an array of book titles, which are considered as potential interests. If a book is a potential interest it means there is a chance user will enjoy such title too because it is rated by some of their friends.


### Computing potential interests

* A book is considered a potential interest if it is rated by at least one of the user's friends, and each user will give it a `score`. Then the recommendations can be limited by a `minimalScore`. (eg. if the minimal score is `0.5`, this is the minimal average score a given book must have to be recommended).

* A book is **not** considered a potential interest if it is already rated by a user.

### Ordering of potential interests

* A book with a higher average score (rated by more friends) should be placed before a book with a lower score.

* In case of same scores titles should be ordered alphabetically. **Important:** to make sure your implementation matches the one expected in tests please use `title1.localeCompare(title2, "en", { sensitivity: "base" })` to compare titles of 2 books.

### Caching

Assuming you use the same instance of `SocialNetworkQueries` for more than 1 `findPotentialInterests` call: 

* In the case of `fetchCurrentUser` resulting in a rejected promise the last known user data should be used instead for computing potential interests' ...

* … unless no successfully fetched user data exists. In such case `findPotentialInterests` should output empty results (`[]`). 

### Not-so-happy paths

* If a user has no field required to compute potential interests, `findPotentialInterests` should resolve with empty results (`[]`). Eg. if there is no `friends` field in a user.

* If some friend has no `ratings` field, `findPotentialInterests` should ignore such friend when computing potential interests.

* If a book is listed more than once for given friend, it should only consider the occurrence with the greater score.
 
### Input

#### `fetchCurrentUser(): Promise<User>`

`fetchCurrentUser` is a function which returns a `Promise`,
either resolved or rejected. The resolved `Promise` contains
user data in form of:

```json
{
    ratings: [
        {
            title: <string>,
            score: <number>
        }
    ]
    friends: [
        { 
            id: <string>,
            ratings: [
                {
                    title: <string>,
                    score: <number>
                }
            ]
        },
    ]
}
```

The field `ratings` contains books rated by the current user. The fields `friends[…].ratings` contain books rated by each friend of the current user.

#### `minimalScore`

`minimalScore` is a float (type of number) between 0 and 1 used to limit computed potential interests for the current user. It represents the minimal average score of a book which should be considered as a potential interest.

Examples:

* `minimalScore` of `0` means all books rated by any of friends has to be considered as potential interests;
* `minimalScore` of `1` means given book must have a max rating of `1` in all user ratings to be considered as a potential interest;
* `minimalScore` of `0.5` means a given book must have at least a `0.5` average friend's score to be considered as a potential interest;

Note: `minimalScore` default value should `0.5` if not defined.

### Example

Let's assume that user data returned in a resolved promise of `fetchCurrentUser` resembles the following …

```json
{
        id: "mrouk3",
        ratings: [
          { title: "Moby Dick", score: 0.6 },
          { title: "Crime and Punishment", score: 0.8 }
        ],
        friends: [{
          id: "YazL",
          ratings: [
            { title: "Crime and Punishment", score: 0.8 },
            { title: "Brave New World", score: 0.4 }
          ],
        }, {
          id: "queen9",
          ratings: [
            { title: "Pride and Prejudice", score: 0.8 },
            { title: "Crime and Punishment", score: 0.5 }
          ],
        }, {
          id: "joyJoy",
          ratings: [
            { title: "Moby Dick", score: 0.2 },
            { title: "Pride and Prejudice", score: 1 }
          ],
        }, {
          id: "0sin5k1",
          ratings: [
            { title: "Pride and Prejudice", score: 0.8 },
            { title: "Brave New World", score: 0.2 }
          ],
        }, {
          id: "mariP",
          ratings: [
            { title: "Moby Dick", score: 0.8 },
            { title: "Frankenstein", score: 0.8 },
            { title: "Crime and Punishment", score: 0.4 }
          ]
        }],
}
``` 

… then if we perform a query with the minimal score of  `0.5` …

```js
const socialNetworkQueries = new SocialNetworkQueries({ fetchCurrentUser });
socialNetworkQueries.findPotentialInterests(0.5)
    .then(potentialInterests => {
        // …
    });
```

… returned `potentialInterests` will be

```json
[
    "Pride and Prejudice",
    "Frankenstein",
]
```

## Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests (this will be used to evaluate your solutions)
3. `npm run test:watch` – run all tests in _watch mode_ (alternative to `npm test` which you might find more convenient to use locally)
4. `nvm install` - (optional) set up the expected _major_ version of Node.js locally ([`nvm`](https://github.com/nvm-sh/nvm) required; Node.js version defined in `.nvmrc` file)

**Good Luck!**
