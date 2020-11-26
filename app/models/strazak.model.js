module.exports = (sequelize, Sequelize) => {
  const Strazak = sequelize.define("strazacy", {
    nazwisko: {
      type: Sequelize.STRING
    },
    imie: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true
  });

  return Strazak;
};
