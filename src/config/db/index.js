import pg, { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.load();

if (process.env.NODE_ENV == 'test-local') {
  pg.defaults.ssl = false;
} else {
  pg.defaults.ssl = true;
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