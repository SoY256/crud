module.exports = app => {
  const strazacy = require("../controllers/strazak.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", strazacy.create);

  // Retrieve all tutki
  router.get("/", strazacy.findAll);

  // Retrieve all published tutki
  router.get("/published", strazacy.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", strazacy.findOne);

  // Update a Tutorial with id
  router.put("/:id", strazacy.update);

  // Delete a Tutorial with id
  router.delete("/:id", strazacy.delete);

  // Create a new Tutorial
  router.delete("/", strazacy.deleteAll);

  app.use("/api/strazacy", router);
};
