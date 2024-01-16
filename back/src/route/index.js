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
    // Припускаємо, що createUser повертає об'єкт користувача з id

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY, // Використання змінної середовища для секрету
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, message: 'User registered successfully.', user: newUser, token});
  } catch (e) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.get('/signup-confirm-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/signup-confirm-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/transaction-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.get('/welcome-page', (req, res) => {
  res.status(200).json('Hello World')
})
// Експортуємо глобальний роутер
module.exports = router
