const { Pool } = require('pg');

const PG_URI = 'postgres://dugyvcke:m8sbtSm8b9fj06NWYlQKtYexrmjrVKSv@castor.db.elephantsql.com/dugyvcke';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

