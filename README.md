## Scope of project
We have created the basics on this API project to provide a starting point for our code challenge. This API uses common packages, frameworks, and style guides as our main API: **waterworks**. For this challenge we would like the candidate to complete as many as possible of the tasks listed below.

* Modify swagger api endpoint to accept integer for number of charges to build.
* Create Postgres database and table structure to store charge data, ideally more than 10,000 charges.
* Write bin script to import charge file to database.
* Write test(s) to cover logic used to import file.
* Build API endpoint to retrieve charge data from database, aggregate data and display in any format.

*Feel free to make any speed or performance changes in the code too. We don't claim to be perfect.*


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
