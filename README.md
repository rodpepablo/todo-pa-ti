# todo-pa-ti
TODO simple API to use as a backend for practicing new technologies on the frontend

## Requirements

Node.js and MongoDB installed

## Using the API

Clone the repo and execute the following commands.

```bash
npm install
npm start
```

The default port is 8000, but you can change it by adding an enviroment variable

```bash
PORT=3000 npm start
```

## API endpoints

+ GET /todos - returns all the TO-DOs

+ GET /todos/:id - returns a specific TO-DO identified by ID

+ POST /todos - creates a TODO (title, description and done (boolean) can be passed) and returns the created document.

+ PUT /todos/:id - updates a TODO and returns the updated document. You can change title, description and/or done.

+ DELETE /todos/:id - deletes a TODO by ID.