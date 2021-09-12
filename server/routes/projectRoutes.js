const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

router.post('/', authController.protect, projectController.createProject);
router.get('/:reg_no', projectController.getProjectDetails);
router.patch('/:id', authController.protect, projectController.updateProject);
router.delete('/:id', authController.protect, projectController.deleteProject);

module.exports = router