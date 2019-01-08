const express = require('express');
const HttpStatus = require('http-status-codes');

const taskRouter = express.Router();

module.exports = {
  routes: (Task) => {
    const taskController = require('./../controllers/taskController.js')(Task);
    taskRouter.route('/tasks')
      .post(taskController.post)
      .get(taskController.get);

    taskRouter.use('/tasks/:id', (req, res, next) => {
      Task.findById(req.params.id, (err, task) => {
        if (err) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(err);
        } else if (task) {
          req.task = task;
          next();
        } else {
          res.status(HttpStatus.BAD_REQUEST)
            .send('no task found');
        }
      });
    });

    taskRouter.route('/tasks/:id')
      .get(taskController.getById)
      .put(taskController.put)
      .patch(taskController.patch)
      .delete(taskController.remove);
    taskRouter.route('/tasksdone')
      .get(taskController.getDoneTasks);

      return taskRouter;
  },
};
