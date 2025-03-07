const Department = require('../models/department');

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) return res.status(404).json({ error: "Department not found" });
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const updated = await Department.update(req.body, {
            where: { deptid: req.params.id }
        });
        if (updated[0] === 0) return res.status(404).json({ error: "Department not found" });
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const deleted = await Department.destroy({
            where: { deptid: req.params.id }
        });
        if (!deleted) return res.status(404).json({ error: "Department not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
