const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');

router.post('/createPermission', permissionsController.createPermission);
router.get('/getAllPermissions', permissionsController.getAllPermissions);
router.get('/:id', permissionsController.getPermissionById);
router.put('/:id', permissionsController.updatePermission);
router.delete('/:id', permissionsController.deletePermission);

module.exports = router;
