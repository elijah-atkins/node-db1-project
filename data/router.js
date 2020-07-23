const express = require("express");
const db = require("./helpers/model.js");

const router = express.Router();    

router.get("/", async (req, res, next) => {
    try {
      const allAccounts = await db.get();
      res.json(allAccounts);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;