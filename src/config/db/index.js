require('dotenv').config();
import { Pool } from 'pg';

const pool = new Pool();

pool.connect();

const db = {
  query: async (string, params) => {
    try {
      await pool.query(string, params);
    } catch (e) {
      console.log(e);
    }
  }
}


export default db;