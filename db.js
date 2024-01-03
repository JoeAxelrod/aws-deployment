import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  user: process.env.DB_PG_USER,
  password: process.env.DB_PG_PASSWORD,
  host: process.env.DB_PG_HOST,
  database: process.env.DB_PG_DATABASE,
  port: process.env.DB_PG_PORT,
  ssl: {
    rejectUnauthorized: false // Set to true for CA-signed certificates
  }
});

client.connect()
  .then(() => console.log("Connected to the database."))
  .catch(err => console.error("Connection error", err));

export { client };
