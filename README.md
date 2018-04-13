## Scope of project
We have created the basics on this API project to provide a starting point for our code challenge. This API uses common packages, frameworks, and style guides as our main API: **waterworks**. For this challenge we would like the candidate to complete as many as possible of the tasks listed below.

* Create Postgres database and table structure to store charge data.
* Write bin script to import charge file to database.
* Write test(s) to cover logic used to import file.
* Build API endpoint to retrieve charge data from database, aggregate data and display in any format.


## Setup and best practices
Here are a few tips to help speed setup of this project.

* Install swagger, ESLint, mocha globally:
```
npm install swagger -g
npm install eslint -g
npm install mocha -g
```
* Code style is import, check your changes with `npm run lint`.


## Postgres setup
```
createdb zylo_chance
psql -d zylo_chance < db/ddl.sql
```


*PS: All Zylo projects are based off of Monopoly ecosystem.*
