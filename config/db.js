const dotenv = require("dotenv");
const Sequelize = require("sequelize");


dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    timezone:'America/Bogota',
    dialectOptions: {
			timezone: "local",
		}
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(err => {
    console.log("No se conectó a la base de datos");
    console.log(err);
  });

module.exports = sequelize;
