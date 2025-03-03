require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  host: "db.gqqjgkfwtwlwhstrrrqw.supabase.co", // Ensure correct host
  port: 5432,
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = sequelize;
