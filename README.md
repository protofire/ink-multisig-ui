# XSigners Multisig UI

This repository houses a user-friendly interface built with Next.js for interacting with a Multi-Signature (MultiSig) smart contract in the Polkadot ecosystem. The smart contract, written in ink!, allows multiple owners to propose, approve, or reject transactions, which are executed only upon meeting an approval threshold. The UI provides an intuitive way to manage owners, adjust the approval threshold, and handle transactions, each assigned a unique ID. The interface aims to simplify the user interaction with complex MultiSig contract functionalities, thereby promoting a more accessible Polkadot ecosystem.

## 📋 Requirements

To run this project, you will need:

- [Node.js](https://nodejs.org/) (version 14 or newer)
- [Yarn](https://yarnpkg.com/)

## Getting Started

### 🚀 Run App

- Clone the repository

### Docker Setup

First you need to create a .env file in the root directory of the project. You must copy the variables in the ./docker/web/.env_web.example file running the following command:

```bash
cp .docker/web/.env_web .env
```

To run the web app along with the Squid node, follow these steps:

- Execute the following command to instantiate all necessary components. Note that it is crucial to wait for the Squid node to be fully synchronized before proceeding and using the app.

  ```bash
  docker-compose --env-file .docker/squid/.env_squid up
  ```

- If you prefer running the app without a local Squid node, you can do the following:

  1. Open the .env file.
  2. Modify the NEXT_SHIBUYA_GQL_ENDPOINT variable to the provided test node.

  ```
  NEXT_SHIBUYA_GQL_ENDPOINT="http://18.118.77.170:4350/graphql"
  ```

  3. Run the app using the command:

  ```bash
  docker-compose up --no-deps web
  ```

> To stop the application, use the following command:

```bash
docker-compose down
```

### Local Stack

- Install the dependencies with `yarn`
- Create a `.env` file in the root directory of the project. You must copy the variables in the `.env.example` file running the following command:

  ```bash
  cp .env.example .env
  ```

- Run the app with `yarn dev`

### 🎨 Run Storybook

- Run storybook system design with `yarn storybook`

## 🧹 Linting

This app uses ESLint, Prettier, and lint-staged for code formatting and consistency.

To check for lint errors, run `yarn lint`.
