// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'students.json');

// Load students
const getStudents = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

// Save students
const saveStudents = (students) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(students, null, 2));
};

// GET - all students
app.get('/api/students', (req, res) => {
  res.json(getStudents());
});

// POST - new student
app.post('/api/students', (req, res) => {
  const students = getStudents();
  students.push(req.body);
  saveStudents(students);
  res.status(201).json({ message: 'Student saved!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
