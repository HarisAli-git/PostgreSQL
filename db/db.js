const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecom',
    password: 'test123',
    port: 5432
});

module.exports = pool;