module.exports = (sequelize, Sequelize) => {
  const Strazak = sequelize.define("strazak", {
    nazwisko: {
      type: Sequelize.STRING
    },
    imie: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Strazak;
};
