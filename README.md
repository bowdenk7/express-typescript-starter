
Express TypeScript Starter
=======================

[![Dependency Status](https://david-dm.org/bowdenk7/express-typescript-starter.svg)](https://david-dm.org/bowdenk7/express-typescript-starter) [![Build Status](https://travis-ci.org/sahat/hackathon-starter.svg?branch=master)](https://travis-ci.org/bowdenk7/express-typescript-starter) 

**Live Demo**: TODO

# Prereqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repo
```
git clone https://github.com/bowdenk7/express-typescript-starter.git project_name
```
- Install dependencies
```
cd project_name
npm install
```
- Start your mongoDB server
```
mongod
```
- Run the project
```
npm start
```

# TODO - Writeup

A majority of this quick start's content was inspired or adapted from Sahat's excellent [Hackathon Starter project](https://github.com/sahat/hackathon-starter).

## Project Structure
-----------------

Folder structure:

> Note! This assumes that you have already built the app using `npm run build` or `yarn run build` 

| Name | Description |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| **.vscode**                         | Contains VS Code specific settings                                                            |
| **dist**                            | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**                    | Contains all your npm dependencies                                                            |
| **src**                             | Contains your source code that will be compiled to the dist dir                               |
| **src/config**                      | Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**                 | Controllers define functions that respond to various http requests                            |
| **src/models**                      | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/public**                      | Static assets that will be used client side                                                   |
| **src/types**                       | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](TODO)          |
| **src**/server.ts                   | Entry point to your express app                                                               |
| **test**                            | Contains your tests. Seperate from source because there is a different build process.         |
| **views**                           | Views define how your app renders on the client. In this case we're using pug                 |
| .env.example                        | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .travis.yml                         | Used to configure Travis CI build                                                             |
| tsconfig.json                       | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json                 | Config settings for compiling tests written in TypeScript                                     |
| tslint.json                         | Config settings for TSLint code style checking                                                |
| yarn.lock                           | Contains same dependency version info as package.json, but used with yarn                     |

## Dependencies
--------------------

Dependencies are managed through `package.json`.
`npm` is the node package manager which you get
In that file you'll find two sections:
- `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| body-parser                     | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                           |
| errorhandler                    | Express 4 middleware.                                                 |
| express                         | Node.js web framework.                                                |
| express-flash                   | Provides flash messages for Express.                                  |
| express-session                 | Express 4 middleware.                                                 |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| morgan                          | Express 4 middleware.                                                 |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| pug (jade)				      | Template engine for Express.                                          |
| request                         | Simplified HTTP request library.                                      |

- `dev dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| concurrently                    | Utility that manages multiple concurrent tasks. Used with npm scripts |
| jest                            | Reports real-time server metrics for Express.                         |
| node-sass                       | GitHub API library.                                                   |
| supertest                       | HTTP assertion library.                                               |
| ts-test                         | Instagram API library.                                                |
| tslint                          | Linter (similar to ESLint) for TypeScript files                       |
| typescript                      | JavaScript compiler/type checker that boosts JavaScript productivity  |
