// config/config.js

const dev = {
  app: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3000,
    db: process.env.MONGO_URL || "mongodb://localhost/hospital",
    secret: process.env.APP_SECRET || "defaultsecret",
  },
};

const prod = {
  app: {
    port: process.env.PORT,
    db: process.env.MONGO_URL,
    secret: process.env.APP_SECRET,
  },
};

const config = {
  dev,
  prod,
};

module.exports = config;
