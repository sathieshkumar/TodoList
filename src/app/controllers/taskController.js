'use strict';

const taskController = (Task) => {
	const post = (req, res) => {
		let task = new Task(req.body);
		if (!req.body.title) {
			res.status(400)
				.send('Title is required.');
		}

		task.save((err) => {
			if (err) {
				res.status(500)
					.send(err);
			}
			else {
				res.status(201)
					.send(task);
			}
		});
	};

	const get = (req, res) => {
		let query = req.query;

		Task.find(query, (err, tasks) => {
			if (err){
				res.status(500)
					.send(err);
			}
			else {		
				let taskArray = [];
				for (let task of tasks) {
					taskArray.push({
						title: task.title,
						priority: task.priority,
						category: task.category,
						due: task.due.toLocaleDateString(),
						done: task.done,
					});
				}
				res.status(200)
					.json(taskArray);
			}
		});
	};

	const getById = (req, res) => {
		res.status(200)
			.json(req.task);
	};
	
	const put = (req, res) => {
		if (!req.body.title) {
			res.status(400)
				.send('Title is required.');
		}
	
		req.task.title = req.body.title;
		req.task.priority = req.body.priority;
		req.task.category = req.body.category;
		req.task.done = req.body.done;
	
		req.task.save((err) => {
			if (err) {
				res.status(500)
					.send(err);
			}
			else {
				res.status(200)
					.json(req.task);
			}
		});
	};
	
	const patch = (req, res) => {
		if (req.body._id) delete req.body._id;
		for (let key in req.body) {
			req.task[key] = req.body[key];
		}
	
		req.task.save((err) => {
			if (err) {
				res.status(500)
					.send(err);
			}
			else {
				res.status(200)
					.json(req.task);
			}
		});
	};
	
	const remove = (req, res) => {
		req.task.remove((err) => {
			if (err) {
				res.status(500)
					.send(err);
			}
			else {
				res.status(204)
					.send('task removed');
			}
		});
	};
	
	return {
		post,
		get,
		getById,
		patch,
		put,
		remove
	};
};

module.exports = taskController;