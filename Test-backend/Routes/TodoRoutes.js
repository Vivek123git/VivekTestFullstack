const express = require('express');
const router = express.Router();

const upload = require('../Controllers/TodoController')

const todoController = require('../Controllers/TodoController')





router.post('/create', todoController.upload,todoController.createTable);
router.get('/get_table',todoController.sendData)
router.post('/delete_table',todoController.deleteData)
router.post('/edit_table',todoController.editData)

module.exports = router;