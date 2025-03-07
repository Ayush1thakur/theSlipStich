const Designation = require('../models/designation');

exports.createDesignation = async (req, res) => {
    try {
        const designation = await Designation.create(req.body);
        res.status(201).json(designation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAll();
        res.status(200).json(designations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);
        if (!designation) return res.status(404).json({ error: "Designation not found" });
        res.status(200).json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDesignation = async (req, res) => {
    try {
        const updated = await Designation.update(req.body, {
            where: { desigid: req.params.id }
        });
        if (updated[0] === 0) return res.status(404).json({ error: "Designation not found" });
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDesignation = async (req, res) => {
    try {
        const deleted = await Designation.destroy({
            where: { desigid: req.params.id }
        });
        if (!deleted) return res.status(404).json({ error: "Designation not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
