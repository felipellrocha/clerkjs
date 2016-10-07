# Clerk.js
### Because every store needs a clerk

> As you can see from the TODOS, do not use this in production.
> This is very much an experiment, there is much more to be
> implemented yet.

Although I love the idea of normalizing my data when writing web apps
using React, it has a serious drawback. Normalizing our stores make
updating the dataset very trivial, while accessing that
same dataset becomes very cumbersome.

This library attemps to do just that. Fix the way we access our data
after the dataset has been normalized by using `Proxy`s.

What does that mean? Follow this example:

First, grab data from the server:

```js
const complexData = [
  {
    id: '1',
    name: 'Bruce Wayne',
    occupation: 'Playboy Billionaire',
    location: [
      {
        id: '2',
        name: 'Gotham',
      },
      {
        id: '1',
        name: '???',
      },
    ],
  },
  {
    id: '2',
    name: 'Alfred J. Pennyworth',
    occupation: 'Butler',
    location: {
      id: '1',
      name: 'Gotham',
    },
  },
  {
    id: '3',
    name: "Ra's al Ghul",
    occupation: 'Killer Ninja',
    location: {
      id: '2',
      name: '???',
    },
  },
];
```

Create a couple of schemas and relations between those schemas:

```js
const Location = new Schema('location');
const Character = new Schema('character');

Character.relation('location', Location);
```

Now you can normalize your data, and access that data in a
denormalized-like way, and try to play around with the data:

```js
const { result, entities: clerk } = normalize(data, Character)
console.log(clerk, result);
console.log(clerk.character[1]);
console.log(clerk.character[1].location);
console.log(clerk.character[1].location[1]);

console.log(clerk.character[2]);
console.log(clerk.character[2].location);
```

After all is said and done, this line:

```js
console.log(clerk.character[1].location[1] === clerk.location[1]);
```

Should print `true`. This allows you to update the data in your reducers
by going directly to the data point you need to update, while, at your
components, you can just pass the data down, and everything will always
be at sync with each other.

I've implemented this example in the `index.js` file,
if you want to take a further look into the idea.

While this is definitely not ready for production (`Proxy`s are only
supported by the newest browsers), I built this to show that being
able to access data in a denormalized way is *as useful* as being able
to update data that has be normalized.

### TODO
- Write tests
- Enable immutability
- Integrate it with something like Redux
