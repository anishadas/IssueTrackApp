const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// router.get('/detail/:id', projectsController.detail);
router.post('/create', projectsController.create);
router.get('/:id', projectsController.openProject);
router.get('/delete/:id', projectsController.delete);
router.use('/issue', require('./issue'));
module.exports = router;