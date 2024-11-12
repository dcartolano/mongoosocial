import { LoremIpsum } from "lorem-ipsum";

const nouns = [
  'dog',
  'hen',
  'stick',
  'helmet',
  'golf',
  'amigo',
  'camel',
  'shark',
  'shale',
  'alleged',
  'cowboy',
  'artesian',
  'chiabatta',
  'italian',
  'roof',
  'cape',
  'anime',
  'great',
  'super',
  'power',
  'abyss',
  'decision',
  'song',
  'water',
  'ocean',
  'esotericism',
  'plane',
  'train',
  'troll',
  'holiday',
  'slender',
  'bridge',
  'chalk',
  'sidewalk',
  'cityscape',
  'chartreuse',
];

const verbs = [
  'licker',
  'maker',
  'greeter',
  'examiner',
  'howler',
  'mother',
  'major',
  'sweeper',
  'miner',
  'lurker',
  'baker',
  'comprehender',
  'ender',
  'case',
  'fowler',
  'dresser',
  'admirer',
  'leader',
  'expresser',
  'knower',
  'decipherer',
  'decoder',
  'enjoyer',
  'marketer',
  'singer',
  'dreamer',
  'terminator',
  'inhibitor',
  'finder',
  'sender',
  'gamer',
  'editor',
  'prescriber',
  'practicioner',
  'prisoner',
  'flyer',
  'dryer',
  'washer',
  'confidante',
];

// Gets a random item given an array
export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random number
export const getRandomNumber = () => (Math.floor(Math.random() * 100)).toString();

// Gets a random username
export const getRandomUsername = () => {
  const username = `${getRandomArrItem(nouns)}-${getRandomArrItem(verbs)}${getRandomNumber()}`;
  return username;
}

// Function to generate random thoughts and reactions that we can add to user object.
export const getRandomLorem = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  // lorem.generateWords(1);
  // lorem.generateSentences(5);
  // lorem.generateParagraphs(7);
  const randomLorem = lorem.generateSentences(1);

  return randomLorem;
};


// // Function to generate random assignments that we can add to student object.
// export const getRandomAssignments = (int: number) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       name: getRandomArrItem(appDescriptions),
//       score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
//     });
//   }
//   return results;
// };

// const appDescriptions = [
//   'Decision Tracker',
//   'Find My Phone',
//   'Learn Piano',
//   'Starbase Defender',
//   'Tower Defense',
//   'Monopoly Money Manager',
//   'Movie trailers',
//   'Hello world',
//   'Stupid Social Media App',
//   'Notes',
//   'Messages',
//   'Email',
//   'Compass',
//   'Firefox',
//   'Running app',
//   'Cooking app',
//   'Poker',
//   'Deliveries',
// ];