const db = require("../models");
const strazak = db.strazacy;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.dodaj = (req, res) => {
  // Validate request
  if (!req.body.nazwisko) {
    res.status(400).send({
      message: "Nazwisko nie może być puste"
    });
    return;
  }

  // Create a Tutorial
  const strazak = {
    nazwisko: req.body.nazwisko,
    imie: req.body.imie,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  strazak.dodaj(strazak)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas zapisu danych strażaka wystąpił błąd."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.znajdzWszystkich = (req, res) => {
  const nazwisko = req.query.nazwisko;
  var condition = nazwisko ? { nazwisko: { [Op.iLike]: `%${nazwisko}%` } } : null;

  strazak.znajdzWszystkich({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas odczytu danych wystąpił błąd"
      });
    });
};

// Find a single Tutorial with an id
exports.znajdzJednego = (req, res) => {
  const id = req.params.id;

  strazak.znajdzPoID(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Błąd odczytu danych strażaka o Id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.zmien = (req, res) => {
  const id = req.params.id;

  strazak.zmien(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dane strażaka zapisane pomyślnie"
        });
      } else {
        res.send({
          message: `Nie można zaktualizować danych strażaka o id=${id}. Być może takie ID nie istnieje, lub req.body jest puste!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nie można zaktualizować danych strażaka o id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.usun = (req, res) => {
  const id = req.params.id;

  strazak.usun({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dane strażaka zostały usunięte!"
        });
      } else {
        res.send({
          message: `Nie można usunąć danych strażaka o id=${id}. Być może podane ID nie istnieje`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nie można usunąć danych strażaka o id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.usunWszystkich = (req, res) => {
  strazak.usun({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Wszystkie dane strażaków zostały usunięte!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas usuwania danych pojawiły się błędy"
      });
    });
};

// find all published Tutorial
exports.znajdzOpublikowanych = (req, res) => {
  strazak.znajdzWszystkich({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas odczytu danych pojawiły się błędy"
      });
    });
};
