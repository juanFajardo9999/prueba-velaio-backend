const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json()); 


let tasks = [
  {
    id: 1,
    name: 'Tarea A',
    date: '2024-10-01',
    state: 'completada',
    persons: [
      {
        name: 'Juan Pérez',
        age: 25,
        skills: [{ name: 'JavaScript' }, { name: 'Angular' }]
      },
      {
        name: 'María López',
        age: 30,
        skills: [{ name: 'TypeScript' }, { name: 'CSS' }]
      }
    ]
  },
  {
    id: 2,
    name: 'Tarea B',
    date: '2024-09-25',
    state: 'completada',
    persons: [
      {
        name: 'Carlos Gómez',
        age: 40,
        skills: [{ name: 'HTML' }, { name: 'SCSS' }]
      }
    ]
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Tarea no encontrada');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
