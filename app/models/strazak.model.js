module.exports = (sequelize, Sequelize) => {
  const Strazak = sequelize.define("strazacy", {
    nazwisko: {
      type: Sequelize.STRING
    },
    imie: {
      type: Sequelize.STRING
    },
    czyMaUprawnienia: {
      type: Sequelize.BOOLEAN
    },
    czyKierowca: {
      type: Sequelize.BOOLEAN
    },
    czyDowodca: {
      type: Sequelize.BOOLEAN
    },
    dataUprawnien: {
      type: Sequelize.DATEONLY
    }
  },
  {
    freezeTableName: true
  });

  return Strazak;
};
