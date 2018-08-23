## Scope of project
We have created the basics on this API project to provide a starting point for our code challenge. This API uses common packages, frameworks, and style guides as our main API: **waterworks**. For this challenge we would like the candidate to complete as many as possible of the tasks listed below.

* Modify swagger api endpoint to accept integer for number of charges to build.
* Create Postgres database and table structure to store charge data, ideally more than 10,000 charges.
* Write bin script to import charge file to database.
* Write test(s) to cover logic used to import file.
* Build API endpoint to retrieve charge data from database, aggregate data and display in any format.

*Feel free to make any speed or performance changes in the code too. We don't claim to be perfect.*


## Setup
1. This project requires [Docker](https://www.docker.com/). If not already installed:
    * [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
    * [Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
    * [Install Docker on Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce/)
    * Other Linux Distros: More likely than not, Docker is available on the package manager shipped with the distro.
2. Ensure no instance of Postgres is running, and no server is running on port 8080. 
3. From the project directory, in terminal run `docker-compose up`
4. Wait for: 
   ```
   info: ===== Chance api has started on port: 4000 
   info: ===== forwarded http://localhost:8080
   ```
   This could take up to a minute, we are install Postgres and Node, after all ;-) .
5. Navigate to [http://localhost:8080](http://localhost:8080). It should say: `Hello, you!`. 

You're ready to code!

## Database

Your Postgres 

## Testing

Some tests have been pre-made for you using mocha. To run tests:

`docker-compose run node npm run test`

Be sure to test throughout the process to ensure quality code!

## Best Practices

Here are a few tips for this project.
* Code style is import, check your changes with `docker-compose run node "npm run lint"`.
* Test often. `docker-compose run node npm run test`

## Zylo stack
Here at Zylo most of out projects are built on Node + Postgres + React. Feel free to use the technologies that you are familiar with but those are our go to tools. Along with that we also use:

* objection.js
* swagger
* mocha
* redux
* victory + D3
* AWS services

*PS: All Zylo projects are named based on the board game Monopoly.*
