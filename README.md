# Complete App Nodejs, Sequelize, React

for final degree project for the "Universidad Dr. Jose Gregorio Hernandez (UJGH)" to opt for the degree in systems engineering.
```bash
Colaborator: Edwin Hernández

Student: Lewis Pinto
```
## Requirements

 - [Node v10.16+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Sequelize](https://sequelize.org/)

## Getting Started

Clone the repo and make it yours:


```bash
git clone https://github.com/edwindhc/UJGH-App.git
cd UJGH-App
```

Install dependencies:

```bash
For backend:
npm install or yarn

for client:
go to cd client and run: 
npm install or yarn
```
## Database Configuration

```bash
 - Set Configuration cd src/config > config.json
 - Change development with host, username, password, database
 - Open database manager and create database
 - Install npm install -g sequelize-cli
 - cd src
 - sequelize-cli db:migrate (This command create automatically all tables)
```

## Running Locally

```bash
All Application: npm start
Only Client: npm run client
Only Server: npm run server
```

## Documentation

```bash
# generate and open api documentation
yarn docs (In progress)
```