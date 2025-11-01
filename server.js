const express = require('express');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  console.log('Executing query:', query);

  try {
    const stmt = db.prepare(query);
    const user = stmt.get();

    if (user) {
      res.render('login', {
        error: null,
        success: `Login berhasil! Selamat datang ${user.name}`
      });
    } else {
      res.render('login', {
        error: 'Email atau password salah',
        success: null
      });
    }
  } catch (error) {
    res.render('login', {
      error: 'Terjadi kesalahan: ' + error.message,
      success: null
    });
  }
});

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  res.render('search', { query });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Gunakan: admin@vapemod.com / admin123 untuk login');
  console.log('SQL Injection test: \' OR 1=1 --');
  console.log('XSS test: <script>alert(1)</script>');
});
