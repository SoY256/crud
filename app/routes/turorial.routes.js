module.exports = app => {
  const tutki = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutki.create);

  // Retrieve all tutki
  router.get("/", tutki.findAll);

  // Retrieve all published tutki
  router.get("/published", tutki.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutki.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutki.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutki.delete);

  // Create a new Tutorial
  router.delete("/", tutki.deleteAll);

  app.use("/api/tutki", router);
};
