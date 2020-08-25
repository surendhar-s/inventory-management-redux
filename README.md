This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Inventory Management

This project require 2 two server to run.
1. Front end which runs on port number 3000
2. JSON-Server for data source which runs on 3001

### `npm run launch`
This command is used to start the project. This command itself runs both React and JSON-Server concurrently.
+ Default Username: abc@xyz.com
+ Default Password: admin

## Functionalities
* Login 
* SignUp
* Dashborad - Which is used to show the graph
* Add/Delete/Update product
* List All product in a table view
* Listing also supports searching and sorting (Name-Price-Category)
* User password is encrypted so that use password can't be revealed at any cost

## Databases
* UserDB - To store user data
* ProductsDB - To store product data
* CategoryDB - To store Category data