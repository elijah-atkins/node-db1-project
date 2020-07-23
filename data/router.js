const express = require("express");
const db = require("./helpers/AccountsModel.js");
const validateAccountBody = require("./middleware/validateAccountsBody")
const router = express.Router();    

router.get("/", async (req, res, next) => {
    try {
      const allAccounts = await db.get();
      res.json(allAccounts);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", validateAccountsId, (req, res) => {
    res.json(req.accounts);
  });
  
  
  router.post("/", validateAccountsBody, async (req, res, next) => {
    try {
      const newAccounts = await db.insert(req.body);
      res.json(newAccounts);
    } catch (error) {
      next(error);
    }
  });
  
  router.put(
    "/:id",
    validateAccountsId,
    validateAccountsBody,
    async (req, res, next) => {
      try {
        const newAccounts = await db.update(req.params.id, req.body);
        res.json(newAccounts);
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.delete("/:id", validateAccountsId, async (req, res, next) => {
    try {
      await db.remove(req.params.id);
      res.json({ message: "DELETED", accounts: req.accounts });
      res.json(deletedAccounts);
    } catch (error) {
      next(error);
    }
  });
  
  async function validateAccountsId(req, res, next) {
    try {
      const validAccounts = await db.get(req.params.id);
  
      if (validAccounts) {
        req.accounts = validAccounts;
        next();
      } else {
        res.status(404).json({ error: "Accounts id could not be found." });
      }
    } catch (error) {
      next(error);
    }
  }

  function validateAccountsBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "Please provide a accounts body" });
    } else if (!req.body.name || !req.body.budget) {
      res.status(400).json({ error: "Please provide a name and a budget." });
    } else {
      next();
    }
  }

  function accountsIdMatchesParams(req, res, next) {
    if (req.body.accounts_id === req.params.id) {
      next();
    } else {
      res.status(400).json({ error: "Accounts id must match params." });
    }
  }


  module.exports = router;