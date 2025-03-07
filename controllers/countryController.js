const Country = require("../models/country");

// Get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single country by ID
exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new country
exports.createCountry = async (req, res) => {
  try {
    const { CountryName } = req.body;
    const newCountry = await Country.create({ CountryName });

    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing country
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { CountryName } = req.body;

    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    await country.update({ CountryName });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a country
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    await country.destroy();
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
