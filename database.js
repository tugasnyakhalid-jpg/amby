const Database = require('better-sqlite3');
const db = new Database('users.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
  )
`);

const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
const result = stmt.get();

if (result.count === 0) {
  const insert = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
  insert.run('admin@vapemod.com', 'admin123', 'Admin');
  insert.run('user@vapemod.com', 'password', 'User Demo');
  console.log('Sample users created');
}

module.exports = db;
