const express = require('express');

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
          res.status(500)
            .send(err);
        } else if (task) {
          req.task = task;
          next();
        } else {
          res.status(400)
            .send('no task found');
        }
      });
    });

    taskRouter.route('/tasks/:id')
      .get(taskController.getById)
      .put(taskController.put)
      .patch(taskController.patch)
      .delete(taskController.remove);

    return taskRouter;
  },
};
