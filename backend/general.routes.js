const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/list.controller');



router.get('/', function (req, res) {
    res.send('<p>Servicios API REST ragasa  ToDo List</p><p>Author: Juan Carlos Mendez Hernandez</p>');
})

router.get('/activity/list', ctrl.getActivity);

router.post('/activity/add', ctrl.addActivity);

router.put('/activity/edit', ctrl.updateActivity);

router.delete('/activity/delete/:id', ctrl.deleteActivity);


module.exports = router;