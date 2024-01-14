// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

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

router.get('/signup-confirm-page', (req, res) => {
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
