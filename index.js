const express = require('express')
const app = express()
app.use(express.json())


const projects = [
  {
    id: 1,
    title: "Traveler",
    tasks: ["Pág login", "divisao das tarefas"]
  },
  {
    id: 2,
    title: "Traveler",
    tasks: ["Pág login", "divisao das tarefas", "outra tarefa"]
  }
]

let i = 0;
app.use((req, res, next) => {
  console.log(`Método: ${req.method}`)
  i++
  next()
  console.log(i)
})
function checkProjectExists(req, res, next) {
  const project = projects[req.params.index]
  if(!project) {
    return res.status(404).json({ error: "Project not exists"})
  }
  return next()
}


app.post('/projects', (req, res) => {
  const newProject = req.body

  projects.push(newProject)

  return res.json(projects)
})

app.post('/projects/:index/tasks',checkProjectExists, (req, res) => {
  const { index } = req.params
  const { title } = req.body

  projects[index].tasks.push(title)

  return res.json(projects[index])
})

app.get('/projects', (req, res) => {
  return res.json(projects)
})

app.get('/projects/:index', checkProjectExists, (req, res) => {
  const { index } = req.params
  return res.json(projects[index])
})

app.put('/projects/:index', checkProjectExists, (req, res) => {
  const { index } = req.params
  const editProject = req.body

  projects[index] = editProject

  return res.json(projects)
})

app.delete('/projects/:index', checkProjectExists, (req, res) => {
  const { index } = req.params

  projects.splice(index, 1)

  return res.status(200).json({ message: `Success! Project ${projects[index].title} deleted!`})
})



app.listen(5000)