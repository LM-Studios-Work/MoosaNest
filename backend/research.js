const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.yvazejcarfwwltrajduc:vq2vTLD72MESjRIm@aws-1-eu-central-1.pooler.supabase.com:6543/postgres",
});

async function main() {
  await client.connect();
  console.log('--- COLLECTIONS ---');
  const collections = await client.query('SELECT title, handle FROM product_collection;');
  console.table(collections.rows);
  
  console.log('\n--- PRODUCTS (first 5) ---');
  const products = await client.query('SELECT title, handle FROM product LIMIT 5;');
  console.table(products.rows);
  
  await client.end();
}

main().catch(console.error);
