const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, {
      where: { customerid: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { customerid: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
