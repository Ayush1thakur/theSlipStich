const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeC');

router.post('/createEmployee', employeeController.createEmployee);
router.get('/getAllEmployee', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
