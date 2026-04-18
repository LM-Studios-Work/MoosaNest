const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  await client.connect();
  const res = await client.query("SELECT token FROM api_key WHERE type = 'publishable' AND revoked_at IS NULL LIMIT 1;");
  if (res.rows.length > 0) {
    console.log("KEY=" + res.rows[0].token);
  } else {
    console.log("No publishable key found.");
  }
  await client.end();
}

run().catch(console.error);
