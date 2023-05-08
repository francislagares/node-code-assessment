
![node-typescript-express-starter](https://res.cloudinary.com/chatty-app/image/upload/v1683311364/node-typescript_qngr0k.webp)

# Node TypeScript Express Boilerplate

 Starter Node.js project with TypeScript, MongoDB, Prisma ORM, ESlint, Prettier and Husky.

Features
--------
- **OOP**
- **Typescript**
- **MongoDB**
- **Prisma ORM**
- **Swagger documentation**
- **class-validator** for validating controller json input
- **ES6 next features**

Prerequisites
-------------

- [Node.js 20 or higher](http://nodejs.org)
- [NPM 9.5.6 or higher](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.org/downloads)
- [Docker](https://docs.docker.com/desktop/install/linux-install/)
- [Docker Compose](https://docs.docker.com/compose/install/)



# Docker

- First create MongoDB database

  ```bash
  $ docker compose -f docker-compose-mongodb.yaml up -d                                                                                            
  ```
 
Run the Project
----------------


- Install the dependencies by running the following command.

  ```bash
  yarn install
  ```

- Start the development server:

  ```bash
  yarn start:dev
  ```

- Start the test suites:

  ```bash
  yarn test
  ```

  You can check the published docs API:
  [nodejs-assessment 
](https://documenter.getpostman.com/view/5824035/2s93eYUBzY)

# Author


Created by [@francislagares](https://www.linkedin.com/in/francislagares/) - feel free to contact me!
* 