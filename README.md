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
* nyc
* Http-status-code
* Should
* chai
* body-parser

## API documentation
API Docs can be accessed at http://localhost:3500/api-docs/ after the server is started

## Test and Coverage

> todolist@1.0.0 test C:\Users\msathiesh\Desktop\TodoList                                                                                                                                              
> set ENV=test&& mocha ./src/test/*.js                                                                                                                                                                                                                                                                                                          
(node:19740) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
  Task Controller Unit Test                                                                                                                                                                            
    Post                                                                                                                                                                                               
      √ should not allow to post a task with out title                                                                                                                                                 
    Put                                                                                                                                                                                                
      √ should not allow to update a task with out title                                                                                                                                               
                                                                                                                                                                                                       
  Integration test for TODO List APIs                                                                                                                                                                  
    √ Should respond with OK (63ms)                                                                                                                                                                    
(node:19740) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.                                                                                     
    √ Should add a Task and return the task (1995ms)                                                                                                                                                   
    √ Should get a task with the given id (39ms)                                                                                                                                                       
    √ Should respond with BAD_REQUEST if the given task id is not present                                                                                                                              
    √ Should get all TODO tasks (41ms)                                                                                                                                                                 
    √ Should get tasks filtered by category (1039ms)                                                                                                                                                   
    √ Should replace the task detail completely for the given task id                                                                                                                                  
    √ Should update atributes of the task with given ID                                                                                                                                                
    √ Should delete the task with given ID                                                                                                                                                             
    √ Should get all the done tasks                                                                                                                                                                    
    √ Should respond with NO_CONTENT if there are no done tasks                                                                                                                                        
                                                              
  13 passing (3s)                                                                                                                                                                                      
