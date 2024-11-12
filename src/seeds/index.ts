import db from '../config/connection.js';
// import { User, Thought } from '../models/index.js';
import { User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomUsername, getRandomLorem } from './data.js';
// import { getRandomUsername } from './data.js';

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  // const usernames = [];
  // const emails = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    // const assignments = getRandomAssignments(20);
    const thoughts = [];

    for (let j=0; j<3; j++) {
    const thought = getRandomLorem();
    thoughts.push(thought);
}
    const name = getRandomUsername();
    const username = name;
    const email = `${username}@maail.com`;
    // const email = 'test';
    // const thoughts = fullName.split(' ')[1];
    // const friends = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    // username: string,
    // email: string,
    // thoughts: Schema.Types.ObjectId[]
    // friends: Schema.Types.ObjectId[]
    await User.create({
      username: username,
      email: email,
    })

    // usernames.push({
    //   username,
    // });

    // emails.push({
    //   email,

    // });
  }

  // Add students to the collection and await the results
  // const userData = await User.create(users);

  // Add thoughts to the collection and await the results
  // await Thought.create({
  //   name: 'UCLA',
  //   inPerson: false,
  //   students: [...userData.map(({ _id }: { [key: string]: any }) => _id)],
  // });

  // Log out the seed data to indicate what should appear in the database
  // console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

