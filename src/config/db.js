const { Pool } = require("pg")
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.dbURL,
    max: 20,
    idkeTimeoutMillis: 30000,
});

modle.exports = {
    query: (text, params) => pool.query(text, params),

    transaction: async (callback) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};