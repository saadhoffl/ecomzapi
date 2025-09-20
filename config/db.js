const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const username = process.env.ECOMZ_DB_USERNAME;
    const password = process.env.ECOMZ_DB_PASSWORD;
    const dbName = process.env.DB_NAME;
    const host = process.env.MONGODB_HOST;

    const uri = `mongodb://${username}:${password}@${host}:2001/${dbName}?authSource=admin`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
