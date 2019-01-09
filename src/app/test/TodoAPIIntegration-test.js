const should = require('should');
const request = require('supertest');
const app = require('../index.js');
const httpStatus = require('http-status-codes');
const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const agent = request.agent(app);

after(() => {
  mongoose.connection.close(() => done());
});

describe('Integration test for TODO List APIs', () => {
	const testTask = {
		title: 'Write Unit texts',
		priority: 3,
		category: 'work',
		due: '01/08/2019',
	};
	it('Should add a Task and return the task', (done) => {
		agent.post('/api/tasks')
			.send(testTask)
			.expect(httpStatus.CREATED)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.done.should.equal(false);
				done();
			})
			.timeout(5000);
	});
	it('Should get a task with the given id', (done) => {
		const task = new Task(testTask);
		task.save();
		agent.get(`/api/tasks/${task._id}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.done.should.equal(false);
				result.body.title.should.equal(testTask.title);
				done();
			})
			.timeout(5000);
	});
	it('Should get all TODO tasks', (done) => {
		let task = new Task(testTask);
		task.save();
		const testTask2 = {
			title: 'Write documentation',
			priority: 4,
			category: 'work',
			due: '01/09/2019',
		};
		task = new Task(testTask2);
		task.save();

		agent.get('/api/tasks')
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(2);
				result.body[0].title.should.equal(testTask.title);
				result.body[1].title.should.equal(testTask2.title);
				done();
			})
			.timeout(5000);
	});
	it('Should get tasks filtered by category', (done) => {
		let task = new Task(testTask);
		task.save();
		const testTask2 = {
			title: 'Pay mobile bill',
			priority: 2,
			category: 'personal',
			due: '01/13/2019',
		};
		task = new Task(testTask2);
		task.save();

		agent.get(`/api/tasks?category=${testTask.category}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(1);
				result.body[0].title.should.equal(testTask.title);
			})
			.timeout(5000);
		agent.get(`/api/tasks?category=${testTask2.category}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(1);
				result.body[0].title.should.equal(testTask2.title);
				done();
			})
			.timeout(5000);
	});
	it('Should replace the task detail completely for the given task id', (done) => {
		const task = new Task(testTask);
		task.save();
		const updatedTask = {
			title: 'Updated task title',
			priority: 2,
		};
		agent.put(`/api/tasks/${task._id}`)
			.send(updatedTask)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.title.should.equal(updatedTask.title);
				should(result.body).not.have.property('category');
				done();
			})
			.timeout(5000);
	});
	it('Should update atributes of the task with given ID', (done) => {
		const task = new Task(testTask);
		task.save();
		const updates = {
			done: true,
		};
		agent.patch(`/api/tasks/${task._id}`)
			.send(updates)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.done.should.equal(true);
				done();
			})
			.timeout(5000);
	});
	it('Should delete the task with given ID', (done) => {
		const task = new Task(testTask);
		task.save();
		agent.delete(`/api/tasks/${task._id}`)
			.expect(httpStatus.NO_CONTENT)
			.end(() => {
				Task.findById(task._id, (err, result) => {
					should(result).be.empty;
					done();
				});
			})
			.timeout(5000);
	});
	it('Should get all the done tasks', (done) => {
		let task = new Task(testTask);
		task.save();
		const doneTask = {
			title: 'Completed tasks',
			priority: 3,
			category: 'work',
			done: true
		};
		task = new Task(doneTask);
		task.save();
		agent.get('/api/tasksdone')
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(1);
				result.body[0].title.should.equal(doneTask.title);
				done();
			})
			.timeout(5000);
	});
	afterEach((done) => {
		Task.remove().exec();
		done();
	});
});