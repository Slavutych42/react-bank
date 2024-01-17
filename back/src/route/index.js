// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {

  res.status(200).json('Hello World')
})

router.get('/balance-page', (req, res) => {
  res.status(200).json('Hello')
})

router.get('/error', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/notifications-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/recive-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/recovery-confirm-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/recovery-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/send-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/settings-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/signin-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/signin-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/signup-page', (req, res) => {
  res.status(200).json('Hello World')
})

async function checkUserExists(email) {
  const users = [{ email: 'existing@example.com', id: '1' }]; 
  const user = users.find(user => user.email === email);
  return user;
}

async function createUser(email, password) {
  const newUser = { id: Date.now(), email, password };
  return newUser; 
}

const users = {};

router.post('/signup-page', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    const newUser = await createUser(email, password);

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
    const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();
    users[email] = { ...newUser, confirmationCode };

    // Відправляємо лише один об'єкт з усією необхідною інформацією
    res.status(200).json({ 
      success: true, 
      message: 'User registered successfully, please confirm your email', 
      user: newUser, 
      token, 
      confirmationCode 
    });
  } catch (e) {
    console.error(e);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
});


router.post('/signup-confirm-page', (req, res) => {
  const { email, confirmationCode } = req.body;
  console.log('Email:', email, 'Confirmation Code:', confirmationCode);
  // Перевірка чи введені email та confirmationCode
  if (!email || !confirmationCode) {
    return res.status(400).json({ success: false, message: 'Email and confirmation code are required.' });
  }

  const user = users[email];
  // Перевірка чи користувач існує та чи введений код збігається з згенерованим
  if (user && user.confirmationCode === confirmationCode) {
    // Тут можна додати дії, які активують користувача в системі, наприклад, оновлення статусу в базі даних

    // Відправка відповіді про успішне підтвердження
    res.json({ success: true, message: 'User confirmed', redirect: '/balance-page' });
  } else {
    // Якщо код невірний, відправка відповіді з помилкою
    res.status(400).json({ success: false, message: 'Invalid confirmation code' });
  }
});


router.get('/signup-confirm-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/transaction-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/welcome-page', (req, res) => {
  res.status(200).json('Hello World')
})

module.exports = router
