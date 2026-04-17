import mysql from "mysql2/promise";

const pool = globalThis.mysqlPool || mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

if (process.env.NODE_ENV !== "production") {
  globalThis.mysqlPool = pool;
}

export default pool;