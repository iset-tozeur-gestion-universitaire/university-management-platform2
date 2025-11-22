const { Client } = require('pg');

async function fixMessagesTable() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'university_db_zei',
    user: 'postgres',
    password: '0000',
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    
    console.log('🗑️  Dropping messages table...');
    await client.query('DROP TABLE IF EXISTS messages CASCADE');
    
    console.log('✅ Messages table dropped successfully!');
    console.log('📌 The table will be recreated when you start the admin service');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixMessagesTable();
