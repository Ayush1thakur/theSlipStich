const express = require('express');
const router = express.Router();
const deptDesigController = require('../controllers/deptDesigController');

router.post('/', deptDesigController.createDeptDesig);
router.get('/', deptDesigController.getAllDeptDesigs);
router.get('/:id', deptDesigController.getDeptDesigById);
router.put('/:id', deptDesigController.updateDeptDesig);
router.delete('/:id', deptDesigController.deleteDeptDesig);

module.exports = router;
