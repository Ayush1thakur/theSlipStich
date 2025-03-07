const Permissions = require('../models/Permissions');

// Create a new permission
exports.createPermission = async (req, res) => {
    try {
        const permission = await Permissions.create(req.body);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permissions.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
    try {
        const permission = await Permissions.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update permission by ID
exports.updatePermission = async (req, res) => {
    try {
        const permission = await Permissions.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }
        await permission.update(req.body);
        res.status(200).json(permission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete permission by ID
exports.deletePermission = async (req, res) => {
    try {
        const permission = await Permissions.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }
        await permission.destroy();
        res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
