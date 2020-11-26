module.exports = app => {
  const strazacy = require("../controllers/strazak.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", strazacy.dodaj);

  // Retrieve all tutki
  router.get("/", strazacy.znajdzWszystkich);

  // Retrieve all published tutki
  router.get("/published", strazacy.znajdzOpublikowanych);

  // Retrieve a single Tutorial with id
  router.get("/:id", strazacy.znajdzJednego);

  // Update a Tutorial with id
  router.put("/:id", strazacy.zmien);

  // Delete a Tutorial with id
  router.delete("/:id", strazacy.usun);

  // Create a new Tutorial
  router.delete("/", strazacy.usunWszystkich);

  app.use("/api/strazacy", router);
};
