const Country_State = require("../models/countryState");

// Get all country-state records
exports.getAllCountryStates = async (req, res) => {
  try {
    const countryStates = await Country_State.findAll();
    res.json(countryStates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single country-state by ID
exports.getCountryStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const countryState = await Country_State.findByPk(id);

    if (!countryState) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(countryState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new country-state record
exports.createCountryState = async (req, res) => {
  try {
    const { countryid, stateid } = req.body;
    const newCountryState = await Country_State.create({ countryid, stateid });

    res.status(201).json(newCountryState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing country-state record
exports.updateCountryState = async (req, res) => {
  try {
    const { id } = req.params;
    const { countryid, stateid } = req.body;

    const countryState = await Country_State.findByPk(id);
    if (!countryState) {
      return res.status(404).json({ message: "Record not found" });
    }

    await countryState.update({ countryid, stateid });
    res.json(countryState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a country-state record
exports.deleteCountryState = async (req, res) => {
  try {
    const { id } = req.params;
    const countryState = await Country_State.findByPk(id);

    if (!countryState) {
      return res.status(404).json({ message: "Record not found" });
    }

    await countryState.destroy();
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
