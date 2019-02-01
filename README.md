# Web Application using Node, Bootstrap, and MongoDB

## Description:
Runs a Node.js web application that asks for input of a robot with a certain type and assigns it tasks and then saves the robot and its tasks done into a database which persists.

## Prerequisites:
### Node.js - https://nodejs.org/en/ 
### MongoDB - https://www.mongodb.com/

### Installation Guide: 
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.80539348.290611985.1543020155-212222879.1543020155

## Setup:
1. Clone Repo
2. run "npm install"
3. create a ".env" file with in the project root with the 1st line being "DATABASE=mongodb://localhost:27017/bot-o-mat"
4. start mongodb using the command "mongod"
5. run npm watch in another terminal in your project root directory
6. go to http://localhost:3000

## Common Issues
Ran into an issue after creating the /data/db directory because the directory does not have permissions. Common fix link: https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea/42447303
