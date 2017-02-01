import { Schema, normalize } from './normalizer'

const data = [
  {
    id: 'bruce',
    name: 'Bruce Wayne',
    occupation: 'Playboy Billionaire',
    enemy: {
      id: 'ghul',
      name: "Ra's al Ghul",
      occupation: 'Trainer',
      location: {
        id: 'unknown',
        name: '???',
      },
    },
    location: [
      {
        id: 'gotham',
        name: 'Gotham',
      },
      {
        id: 'unknown',
        name: '???',
      },
    ],
  },
  {
    id: 'alfred',
    name: 'Alfred J. Pennyworth',
    occupation: 'Butler',
    location: {
      id: 'gotham',
      name: 'Gotham',
    },
  },
  {
    id: 'ghul',
    name: "Ra's al Ghul",
    occupation: 'Trainer',
    location: {
      id: 'unknown',
      name: '???',
    },
  },
];


const Location = new Schema('location');
const Character = new Schema('character');

Character.relation('location', Location);
Character.relation('enemy', Character);

const { result, entities: clerk } = normalize(data, Character)

console.log(clerk, result);
console.log(clerk.character.bruce);
console.log(clerk.character.bruce.location);
console.log(clerk.character.bruce.location[1]);
console.log(clerk.location.gotham);

console.log(clerk.character.bruce.location[0] === clerk.location.gotham);
console.log(clerk.location.unknown);
console.log(clerk.character.bruce.enemy);
clerk.character.bruce.enemy.occupation = 'Killer Ninja';
console.log(clerk.character.bruce.enemy);
console.log(clerk.character.ghul);

clerk.character.bruce.enemy = [
  {
    id: 'ghul',
    name: "Ra's al Ghul",
    occupation: 'Killer Ninja',
    location: {
      id: 'unknown',
      name: '???',
    },
  },
  {
    id: 'bane',
    name: "Bane",
    occupation: 'League of Assassins',
    location: {
      id: 'unknown',
      name: '???',
    },
  },
];

console.log(clerk.character.bruce);
console.log(clerk.character.bruce.enemy);
console.log(clerk.character.bruce.enemy[1]);
console.log(clerk.character.bruce.enemy[1] === clerk.character.bane);

clerk.character.bruce.enemy[0] = {
  id: 'joker',
  name: "Joker",
  occupation: 'Psychopath',
  location: {
    id: 'unknown',
    name: '???',
  },
};

console.log(clerk.character.bruce.enemy);
