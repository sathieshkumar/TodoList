const bodyParser = require('body-parser');
const express = require('express');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const Task = require('./models/taskModel');

const PORT = process.env.PORT || 3500;

if (process.env.ENV === 'test') {
  mongoose.connect('mongodb://localhost/todostest');
}
else {
  mongoose.connect('mongodb://localhost/todos');
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.status(HttpStatus.OK);
  res.send('Success');
});

const swaggerDefinition = {
  info: {
    title: 'Todo List Aplication APIs',
    version: '1.0',
    description: 'APIs for TODO List operations.',
  },
  schemes: ['http'],
};
const options = {
  swaggerDefinition,
  apis: [
    './src/app/controllers/taskController.js',
  ],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, (req, res, next) => {
  swaggerUI.setup(swaggerSpec)(req, res);
  next();
});

app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

const taskRouter = require('./Routes/taskRoutes.js').routes(Task);

app.use('/api', taskRouter);

app.listen(PORT, () => console.log('listening on port 3500'));
