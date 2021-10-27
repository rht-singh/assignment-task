const router = require('express').Router();
const api = require('./route');

router.route('/todos').get(api.getUser);
router.route('/users/:id').get(api.getUserAndTodo);
module.exports = router;