const { Sequelize } = require("sequelize");

// Using environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Required for Supabase
      rejectUnauthorized: false, // Bypass self-signed certs
    },
  },
  logging: (...msg) => console.log(msg),
});

module.exports = sequelize;
