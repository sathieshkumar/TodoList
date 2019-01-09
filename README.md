# TodoList API
APIs to perform basic operations for a todo list.

## End Points
### GET:
* /status - To do a health check of the API server
* /api/tasks - Gets all the TODO tasks from the list
* /api/tasks/{taskId} - Gets the TODO item from the list with the given taskId
* /api/tasksdone - Gets the done tasks from the todo list
### POST:
* /api/tasks - Adds a task to the TODO List
### PUT:
* /api/tasks/{taskId} - Updates a task  with the given taskId
### PATCH:
* /api/tasks/{taskId} - Performs partial update on a task with the given taskId
### DELETE:
* /api/tasks/{taskId} - Removes a task with given taskId from the TODO list

## Packages Used
* Express
* Mongoose
* SuperTest
* Swagger-ui-express
* Istanbul
* Http-status-code
* Should
* chai
* body-parser

## API documentation
API Docs can be accessed at http://localhost:3500/api-docs/ after the server is started


