const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
  { id: 1, name: 'สมชาย', major: 'เทคโนโลยีสารสนเทศ' },
  { id: 2, name: 'สมหญิง', major: 'เทคโนโลยีสารสนเทศ' }
];
let nextId = 3;

app.get('/', (req, res) => {
  res.send(`
    <h1>Student Task Tracker</h1>
    <p>Build Process สำเร็จแล้ว!</p>
    <p>ระบบบันทึกงานนักศึกษา</p>
  `);
});

app.get('/students', (req, res) => {
  res.status(200).json(students);
});

app.post('/students', (req, res) => {
  const { name, major } = req.body || {};
  if (!name || !major) {
    return res.status(400).json({ message: 'กรุณาระบุ name และ major' });
  }
  const newStudent = { id: nextId++, name, major };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษา' });
  }
  const { name, major } = req.body || {};
  if (name !== undefined) student.name = name;
  if (major !== undefined) student.major = major;
  res.status(200).json(student);
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษา' });
  }
  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: 'ลบข้อมูลสำเร็จ', data: deleted });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
