const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// 新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新增需求
router.post('/', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  Todo.create({
    name,
    isDone: false,
    UserId
  })
  res.redirect('/')
})

// 詳細頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 送出編輯資訊
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      console.log(isDone)
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 送出刪除請求
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      return todo.destroy()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router