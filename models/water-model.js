 import express from ("express");


import Water from ("../water/water-model.js");

const router = express.Router();

// // find

router.get("/", (req, res) => {
Water.find()
 .then(water => {
  res.json(water);
})
.catch(error => {
 res.status(500).json({ message: "Failed to get water schedule." });
   });
});
