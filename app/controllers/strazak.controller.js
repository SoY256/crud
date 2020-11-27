const db = require("../models");
const Strazak = db.strazacy;
const Op = db.Sequelize.Op;

// Create and Save a  new  Tutorial
exports.create = (req, res) => {
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
    czyMaUprawnienia: req.body.czyMaUprawnienia ? req.body.czyMaUprawnienia : false,
    czyKierowca: req.body.czyKierowca,
    czyDowodca: req.body.czyDowodca,
    dataUprawnien: req.body.dataUprawnien
  };

  // Save Tutorial in the database
  Strazak.create(strazak)
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
exports.findAll = (req, res) => {
  const nazwisko = req.query.nazwisko;
  var condition = nazwisko ? { nazwisko: { [Op.iLike]: `%${nazwisko}%` } } : null;

  Strazak.findAll({ where: condition })
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Strazak.findByPk(id)
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
exports.update = (req, res) => {
  const id = req.params.id;

  Strazak.update(req.body, {
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
exports.delete = (req, res) => {
  const id = req.params.id;

  Strazak.destroy({
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
exports.deleteAll = (req, res) => {
  Strazak.destroy({
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
exports.findAllPublished  = (req, res) => {
  Strazak.findAll({ where: { czyMaUprawnienia: true } })
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
