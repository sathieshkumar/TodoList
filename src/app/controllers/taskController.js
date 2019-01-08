const HttpStatus = require('http-status-codes');

const taskController = (Task) => {
  /**
	* @swagger
	* /api/tasks:
	*   post:
	*     description: Adds a task to the TODO List
	*     tags: ['ToDo List']
	*     produces:
	*       - application/json
	*     parameters:
	*        - in: body
	*          name: body
	*          schema:
	*            type: object
	*            properties:
	*              title:
	*                type: string
	*              priority:
	*                type: string
	*              category:
	*                type: string
	*              due:
	*                type: date
	*              done:
	*                type: boolean
	*     responses:
	*        "201":
	*           description: Added the task successfully to the TODO list.
	*        "400":
	*           description: Invalid input. Missing/Incorrect input. Bad request.
	*        "500":
	*           description: Unable to process the request.
	*/
  const post = (req, res) => {
    const task = new Task(req.body);
    if (!req.body.title) {
      res.status(HttpStatus.BAD_REQUEST)
        .send('Title is required.');
    }

    task.save((err) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err);
      } else {
        res.status(HttpStatus.CREATED)
          .send(task);
      }
    });
  };

   /**
	 * @swagger
	 *
	 * /api/tasks:
	 *   get:
	 *     description: Gets all the TODO items from the list
	 *     tags: ['ToDo List']
	 *     produces:
	 *       - application/json
	 *     responses:
	 *        200:
	 *         description: Returns the todo list items. 
	 *        500:
	 *         description: Unable to process the request.
	 */
  const get = (req, res) => {
    const query = req.query;

    Task.find(query, (err, tasks) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err);
			}
			else {
        const taskArray = [];
        for (const task of tasks) {
          taskArray.push({
            title: task.title,
            priority: task.priority,
            category: task.category,
            due: task.due.toLocaleDateString(),
            done: task.done,
            _id: task._id
          });
        }
        res.status(HttpStatus.OK)
          .json(taskArray);
      }
    });
  };

   /**
	 * @swagger
	 *
	 * /api/tasks/{taskId}:
	 *   get:
	 *     description: Gets the TODO item from the list with the given taskId
	 *     tags: ['ToDo List']
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: taskId
	 *         in: path
	 *         schema:
	 *             type: string
	 *         description: id of the task(MongoDB Id)
	 *     responses:
	 *       200:
	 *         description: Returns the todo list item with given taskId. Returns a message if not available. 
	 *       500:
	 *         description: Unable to process the request.
	 */
  const getById = (req, res) => {
    res.status(HttpStatus.OK)
      .json(req.task);
  };

  /**
	* @swagger
	* /api/tasks/{taskId}:
	*   put:
	*     description: Updates a task with the given taskId
	*     tags: ['ToDo List']
	*     produces:
	*       - application/json
	*     parameters:
	*        - name: taskId
	*          in: path
	*          description: Id of the task to update
	*        - name: body
	*          in: body
	*          schema:
	*            type: object
	*            properties:
	*              title:
	*                type: string
	*              priority:
	*                type: string
	*              category:
	*                type: string
	*              due:
	*                type: date
	*              done:
	*                type: boolean
	*     responses:
	*        "201":
	*           description: Updated the task successfully.
	*        "400":
	*           description: Invalid input. Missing/Incorrect input. Bad request.
	*        "500":
	*           description: Unable to process the request.
	*/
  const put = (req, res) => {
    if (!req.body.title) {
      res.status(HttpStatus.BAD_REQUEST)
        .send('Title is required.');
    }

    req.task.title = req.body.title;
    req.task.priority = req.body.priority;
    req.task.category = req.body.category;
    req.task.done = req.body.done;

    req.task.save((err) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err);
      } else {
        res.status(HttpStatus.OK)
          .json(req.task);
      }
    });
  };

  /**
	* @swagger
	* /api/tasks/{taskId}:
	*   patch:
	*     description: Performs partial update on a task with the given taskId
	*     tags: ['ToDo List']
	*     produces:
	*       - application/json
	*     parameters:
	*        - name: taskId
	*          in: path
	*          description: Id of the task to update
	*        - name: body
	*          in: body
	*          schema:
	*            type: object
	*            properties:
	*              title:
	*                type: string
	*              priority:
	*                type: string
	*              category:
	*                type: string
	*              due:
	*                type: date
	*              done:
	*                type: boolean
	*     responses:
	*        "201":
	*           description: Updated the task successfully.
	*        "500":
	*           description: Unable to process the request.
	*/
  const patch = (req, res) => {
    if (req.body._id) delete req.body._id;
    for (const key in req.body) {
      req.task[key] = req.body[key];
    }

    req.task.save((err) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err);
      } else {
        res.status(HttpStatus.OK)
          .json(req.task);
      }
    });
  };

   /**
	 * @swagger
	 * /api/tasks/{taskId}:
	 *   delete:
	 *     description: Removes a task with given taskId from the TODO list
	 *     tags: ['ToDo List']
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: taskId
	 *         in: path
	 *         description: The id of the TODO task.
	 *     responses:
	 *        "204":
	 *           description: Deleted the task successfully from the list. Task with given taskId is not available.
	 *        "500":
	 *           description: Unable to process the request.
	 */
  const remove = (req, res) => {
    req.task.remove((err) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err);
      } else {
        res.status(HttpStatus.NO_CONTENT)
          .json(req.task);
      }
    });
  };

   /**
	 * @swagger
	 * /api/tasks/{taskId}:
	 *   delete:
	 *     description: Removes a task with given taskId from the TODO list
	 *     tags: ['ToDo List']
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: taskId
	 *         in: path
	 *         description: The id of the TODO task.
	 *     responses:
	 *        "200":
	 *           description: Returns the done todo list items. 
	 *        "204":
	 *           description: No done tasks available.
	 *        "500":
	 *           description: Unable to process the request.
	 */
	const getDoneTasks = async (req, res) => {
		try {
			let doneTasks = await Task.find({ done: true });
			if (doneTasks.lenth > 0) {
				res.status(HttpStatus.OK).json(doneTasks);
			}
			else {
				res.status(HttpStatus.NO_CONTENT).send('No done tasks');
			}
		}
		catch (err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		}
	};

  return {
    post,
    get,
    getById,
    patch,
    put,
		remove,
		getDoneTasks
  };
};

module.exports = taskController;