import pg, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.load();

if (process.env.DATABASE_URL.includes('.com')) {
  pg.defaults.ssl = true;
} else {
  pg.defaults.ssl = false;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Pool connected!');
});

const db = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}

export default db;