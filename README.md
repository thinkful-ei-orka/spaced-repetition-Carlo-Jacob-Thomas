# Speak-Easy  - client


Speak-Easy is a language learning application that assists users in learning how to speak multiple foreign languages by using spaced repetition. The app encourages the user to listen to the pronunciation of the word, then use their microphone to translate the word. The word list is structured in the database using a linked list.


### Live Link

The live site can be accessed at [https://speak-easy-lake.vercel.app/]


## Server

This app is meant to run with [https://github.com/thinkful-ei-orka/spaced-repetition-api-Carlo-Thomas-Jacob].

Please look at the README.md for more information on utilizing the server.

### To Use With Server

Please update the API_ENDPOINT in the config.js to point to where your server is running.

You will need a TOKEN_KEY to access the Speak-Easy API server, which should be kept secret.

## Tech Stack

REACT, JavaScript, CSS3, HTML5, SCSS, NodeJS, ExpressJS, PostgreSQL

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
