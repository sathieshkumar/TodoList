'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const PORT = process.env.PORT || 3500;

let db = mongoose.connect('mongodb://localhost/todos');
const Task = require('./models/taskModel');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.status =200;
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

app.get('/swagger.json', function (req, res) {
	res.json(swaggerSpec);
});

let taskRouter = require('./Routes/taskRoutes.js').routes(Task);
app.use('/api', taskRouter);

app.listen(PORT, () => console.log(`listening on port 3500`));