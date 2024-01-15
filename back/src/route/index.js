// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

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

router.get('/signup-page', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/signup-page', async (req, res) => {
  const { email, password } = req.body;

  // Перевірка, чи дані не пусті
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    // Перевірка, чи користувач з таким email вже існує
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    const user = { email }; // Об'єкт користувача
  const token = jwt.sign(user, 'secret_key'); // Використовуйте секретний ключ

  res.status(200).json({ success: true, token });

    // Створення нового користувача
    const newUser = await createUser(email, password);
    // Припускаємо, що createUser повертає об'єкт користувача

    // Повертаємо успіх
    res.status(200).json({ success: true, message: 'User registered successfully.', user: newUser });
  } catch (error) {
    // Повертаємо помилку сервера
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
  
  async function checkUserExists(email) {
  // Симуляція перевірки в базі даних
  const users = [{ email: 'existing@example.com' }]; // Тимчасовий список користувачів
  return users.some(user => user.email === email);
}

// Тимчасова функція для створення користувача (зазвичай це б вимагало запиту до бази даних)
async function createUser(email, password) {
  // Симуляція створення користувача в базі даних
  const newUser = { email, password }; // У реальній базі даних пароль має бути захешований!
  return newUser; // Повертаємо нового користувача
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
