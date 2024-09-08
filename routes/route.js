// routes/route.js
const express = require("express");
const { createmodel, deleteUser, getAllUsers, updateUser } = require("../controllers/create");

const router = express.Router();

router.post("/create", createmodel);
router.delete("/user/:id", deleteUser); 
router.get("/users", getAllUsers); 
router.put("/user/:id", updateUser); 

module.exports = router;
