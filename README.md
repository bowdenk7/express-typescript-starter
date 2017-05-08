--
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
git clone --depth=1 https://github.com/bowdenk7/express-typescript-starter.git project_name
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
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000`

# TODO - Writeup

A majority of this quick start's content was inspired or adapted from Sahat's excellent [Hackathon Starter project](https://github.com/sahat/hackathon-starter).

## Project Structure
-----------------

Folder structure:

> Note! This assumes that you have already built the app using `npm run build` or `yarn run build` 

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/public**           | Static assets that will be used client side                                                   |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](TODO)          |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Seperate from source because there is a different build process.         |
| **views**                | Views define how your app renders on the client. In this case we're using pug                 |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .travis.yml              | Used to configure Travis CI build                                                             |
| .copyStaticAssets.js     | Build script that copies images, fonts, and JS libs to the dist folder                        |
| package.json             | File that contains npm dependencies as well as [build scripts](TODO)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| tslint.json              | Config settings for TSLint code style checking                                                |
| yarn.lock                | Contains same dependency version info as package.json, but used with yarn                     |

## Build scripts

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` (or `yarn run <script-name` if using yarn) from the command line.
You'll notice that npm scripts can call eachother which makes it easy to compose complex builds out of simple individual build scrpits.
Below is a list of all the scripts this template has available:


| Name | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `prestart`                | Called automatically before start. Makes sure initial `.css` files are built.                     |
| `start`                   | Runs full build before starting all watch tasks. Can be invoked with `npm start`                  |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `tslint`, `copy-static-assets`)       |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch`                   | Runs all watch tasks (TypeScript, Sass, Node)                                                     |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and recompiles when needed                |
| `build-sass`              | Compiles all `.scss` files to `.css` files                                                        |
| `watch-sass`              | Same as `build-sass` but continously watches `.scss` files and recompiles when needed             |
| `tslint`                  | Runs TSLint on project files                                                                      |
| `copy-static-assets`      | Calls script that copies JS libs, fonts, and images to dist directory                             |


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

## Type Definition (`.d.ts`) Files

TypeScript uses `.d.ts` files to provide types for JavaScript libraries that were not written in TypeScript.
This is great because once you have a `.d.ts` file, TypeScript can type check that library and provide you better help in your editor.
The TypeScript community actively shares all of the most up-to-date `.d.ts` files for popular libraries on a GitHub repository called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types).
These `.d.ts` files can be easily installed into your project by using the npm scope `@types`.
For example, if we want the `.d.ts` file for jQuery, we can fetch it with `npm install --save-dev @types/jquery`.

> Note! Be sure to add `--save-dev` (or `-D`) to your `npm install`. `.d.ts` files are project dependencies, but only used at compile time and thus should be dev dependencies.

## Yarn vs NPM

[Yarn](https://yarnpkg.com/en/) is a new JavaScript package manager that builds off of npm. 
It is not a replacement for npm, however it does provide a few advantages over npm in some cases.

Yarn is generally faster and has a few extra features like `yarn why <package>` which will tell you which package required a specific dependency.
Yarn also doesn't clutter your command prompt when your npm scripts return with status 1.
For these reasons I would personally recommend downloading and giving Yarn a shot.
That said, everything in this template can be used with npm as well.