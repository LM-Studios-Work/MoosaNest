const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.yvazejcarfwwltrajduc:vq2vTLD72MESjRIm@aws-1-eu-central-1.pooler.supabase.com:6543/postgres",
});

async function main() {
  await client.connect();
  console.log('--- CATEGORIES ---');
  const categories = await client.query('SELECT name, handle FROM product_category;');
  console.table(categories.rows);
  
  await client.end();
}

main().catch(console.error);
