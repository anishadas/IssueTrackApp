const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issuesController');

// router.get('/detail/:id', projectsController.detail);
router.post('/create', issueController.create);
router.get('/delete/:id', issueController.delete);

// router.get('/:id', projectsController.openProject);
module.exports = router;