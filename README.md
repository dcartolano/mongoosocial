# mongoosocial

## Description

The goal of this app was to create a social network simulation that utilizes CRUD operations that can be viewed and tested using a program like Insomnia. Users can be created, updated, deleted, and assigned to other users's friends lists. Thoughts can also be created/deleted and connected to a specific user, as well as reactions that can be tied to a specific thought.

This app uses MongoDB for the database, and gave me practice with seeding a database, using routes to access the database, and creating and implementing models.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Copy the SSH Key from the [GitHub Repository](https://github.com/dcartolano/mongoosocial) and perform a git clone into a local directory of your choice. Open in VS Code or similar program. In the integrated terminal, run `npm i` to download all relevant node modules. 

To be able to seed the database, you will need to use a program like MongoD Compass and have it open. Run the command `npm run seed` to create the database and seed the users.  

## Usage

To start the program, run the command `npm run start` to both run the build command and also to start the server. 

[Click here](https://drive.google.com/file/d/19NNYONu5Ut268N6ujCeKbgo5C45SiWFe/view) to view a demo video of using the app in Insomnia.

Use the routes as noted in `src/routes/api/thoughtRoutes.ts` and `src/routes/api/userRoutes.ts`, and all information about body/params formatting and get/push/put/delete specifications can be found in `src/controllers/thoughtController.ts` and `src/controllers/userController.ts`.

Provide instructions and examples for use. Include screenshots as needed.

## Credits

Thanks to EdX and Northwestern for the starter code and the opportunity to practice these skills. 

Thanks also to my instructor and the EdX tutors for all the help and clarifications along the way.

## License

n/a