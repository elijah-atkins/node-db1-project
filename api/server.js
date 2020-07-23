const express = require("express");

const AccountRouter = require("../data/router")

const server = express();

server.use(logger)
server.use(express.json());

server.use("/api/accounts", AccountRouter)


//custom middleware

function notFound(req, res) {
    res.status(404).send(`<h2>${req.url}? 404!</h2>`);
  }
  
  function logger(req, res, next) {
    console.log(`Request Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Timestamp: ${new Date()}`);
    next();
  }
  
  server.use(notFound);
  
  module.exports = server;