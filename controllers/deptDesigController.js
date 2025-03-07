const Dept_Desig = require('../models/department_desig');

exports.createDeptDesig = async (req, res) => {
    try {
        const deptDesig = await Dept_Desig.create(req.body);
        res.status(201).json(deptDesig);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDeptDesigs = async (req, res) => {
    try {
        const deptDesigs = await Dept_Desig.findAll();
        res.status(200).json(deptDesigs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDeptDesigById = async (req, res) => {
    try {
        const deptDesig = await Dept_Desig.findByPk(req.params.id);
        if (!deptDesig) return res.status(404).json({ error: "Not Found" });
        res.status(200).json(deptDesig);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDeptDesig = async (req, res) => {
    try {
        const updated = await Dept_Desig.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] === 0) return res.status(404).json({ error: "Not Found" });
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDeptDesig = async (req, res) => {
    try {
        const deleted = await Dept_Desig.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) return res.status(404).json({ error: "Not Found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
