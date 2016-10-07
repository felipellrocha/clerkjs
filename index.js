import { Schema, normalize } from './normalizer'

const data = [
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


const Location = new Schema('location');
const Character = new Schema('character');

Character.relation('location', Location);

const { result, entities: clerk } = normalize(data, Character)

console.log(clerk, result);
console.log(clerk.character[1]);
console.log(clerk.character[1].location);
console.log(clerk.character[1].location[1]);

console.log(clerk.character[1].location[1] === clerk.location[1]);
console.log(clerk.character[1].location[1]);
console.log(clerk.location[2]);
