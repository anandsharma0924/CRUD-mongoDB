// controllers/create.js
const Create = require("../models/createmodel");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Define the number of salt rounds

const createmodel = async (req, res) => {
  try {
    const existingUser = await Create.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new Create({
      ...req.body,
    });

    let result = await newUser.save();

    // Remove sensitive information before sending the response
    result = result.toObject();
    delete result.password;

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10); // Convert to integer

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await Create.findOneAndDelete({ id: userId });

    console.log(result, "resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult");

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted", result });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Create.find({});

    const usersWithoutPasswords = users.map(user => {
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10); // Convert to integer

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updates = req.body;
    if (updates.password) {
      // Hash the new password if provided
      updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }

    const result = await Create.findOneAndUpdate({ id: userId }, updates, { new: true });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information before sending the response
    const updatedUser = result.toObject();
    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createmodel, deleteUser, getAllUsers, updateUser };
