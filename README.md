# Ink Multisig UI

This repository houses a user-friendly interface built with Next.js for interacting with a Multi-Signature (MultiSig) smart contract in the Polkadot ecosystem. The smart contract, written in ink!, allows multiple owners to propose, approve, or reject transactions, which are executed only upon meeting an approval threshold. The UI provides an intuitive way to manage owners, adjust the approval threshold, and handle transactions, each assigned a unique ID. The interface aims to simplify the user interaction with complex MultiSig contract functionalities, thereby promoting a more accessible Polkadot ecosystem.

## 📋 Requirements

To run this project, you will need:

- [Node.js](https://nodejs.org/) (version 14 or newer)
- [Yarn](https://yarnpkg.com/)

## Getting Started

### 🛠️ Installation

1. Clone the repository
2. Install the dependencies with `yarn`

### 🚀 Run App

### Docker

- Run the app with `docker-compose --env-file .docker/squid/.env_squid up`

> To stop the app, run `docker-compose down`

### Local Stack

- Run the app with `yarn dev`

### 🎨 Run Storybook

- Run storybook system design with `yarn storybook`

## 🧹 Linting

This app uses ESLint, Prettier, and lint-staged for code formatting and consistency.

To check for lint errors, run `yarn lint`.
