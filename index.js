//Node.js® es un entorno de ejecución para JavaScript construido con V8, motor de JavaScript de Chrome.
// ``
const express = require('express')
const app = express()

app.use(express.json())

let notes = [{
  "id": 1,
  "content": "mucho content 1 y mucho texto ",
  "important": true
},{
  "id": 2,
  "content": "mucho content 2",
  "important": false
},{
  "id": 3,
  "content": "mucho content 3",
  "important": true
},]

app.get('/', (req, res) => {
  res.send('<h1>Express is here</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id == id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})


const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})