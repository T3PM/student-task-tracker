const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
  { id: 1, name: 'สมชาย', major: 'เทคโนโลยีสารสนเทศ' },
  { id: 2, name: 'สมหญิง', major: 'เทคโนโลยีสารสนเทศ' }
];
let nextId = 3;

const homeHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Task Tracker</title>
  <style>
    :root {
      --primary: #0D9488;
      --primary-hover: #0F766E;
      --bg: #F0FDFA;
      --card: #FFFFFF;
      --fg: #134E4A;
      --muted: #475569;
      --border: #99F6E4;
      --line: #E2E8F0;
      --danger: #DC2626;
      --danger-hover: #B91C1C;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Leelawadee UI", "Segoe UI", Tahoma, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      background-color: var(--bg);
      color: var(--fg);
      min-height: 100vh;
      padding: 32px 16px;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
      display: grid;
      gap: 20px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }
    h1 { font-size: 24px; font-weight: 700; color: var(--fg); }
    .subtitle { color: var(--muted); font-size: 14px; margin-top: 4px; }
    .badge {
      background: #CCFBF1;
      color: #0F766E;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 999px;
    }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 14px; }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 560px) {
      .form-grid { grid-template-columns: 1fr; }
    }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 14px; font-weight: 600; color: var(--fg); }
    input {
      height: 42px;
      padding: 8px 12px;
      background-color: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: #0F172A;
    }
    [hidden] { display: none !important; }
    input:focus-visible, button:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 14px;
      align-items: center;
    }
    button {
      height: 40px;
      padding: 0 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background-color 180ms ease;
    }
    .btn-primary { background: var(--primary); color: #FFFFFF; }
    .btn-primary:hover { background: var(--primary-hover); }
    .btn-ghost { background: #F1F5F9; color: #334155; }
    .btn-ghost:hover { background: #E2E8F0; }
    .btn-edit { background: #E0F2FE; color: #0369A1; height: 34px; padding: 0 10px; font-size: 13px; }
    .btn-edit:hover { background: #BAE6FD; }
    .btn-del { background: #FEE2E2; color: var(--danger); height: 34px; padding: 0 10px; font-size: 13px; }
    .btn-del:hover { background: #FECACA; }
    .status { font-size: 14px; color: var(--primary-hover); min-height: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td {
      text-align: left;
      padding: 12px 10px;
      border-bottom: 1px solid var(--line);
      font-size: 15px;
    }
    th { font-size: 13px; color: var(--muted); font-weight: 600; }
    .row-actions { display: flex; gap: 8px; }
    .empty { color: var(--muted); text-align: center; padding: 20px 0; }
    @media (prefers-reduced-motion: reduce) {
      button { transition: none; }
    }
  </style>
</head>
<body>
  <main class="container">
    <section class="card header">
      <div>
        <h1>Student Task Tracker</h1>
        <p class="subtitle">Build Process สำเร็จแล้ว! ระบบบันทึกงานและจัดการข้อมูลนักศึกษา</p>
      </div>
      <span class="badge">v1.0.0</span>
    </section>

    <section class="card">
      <h2 id="form-title">เพิ่มข้อมูลนักศึกษา</h2>
      <form id="student-form">
        <input type="hidden" id="edit-id" value="" />
        <div class="form-grid">
          <div class="field">
            <label for="name">ชื่อนักศึกษา</label>
            <input id="name" type="text" placeholder="เช่น ธนภูมิ" required />
          </div>
          <div class="field">
            <label for="major">สาขาวิชา</label>
            <input id="major" type="text" placeholder="เช่น เทคโนโลยีสารสนเทศ" required />
          </div>
        </div>
        <div class="actions">
          <button type="submit" class="btn-primary" id="submit-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            <span>บันทึกข้อมูล</span>
          </button>
          <button type="button" class="btn-ghost" id="cancel-btn" hidden>ยกเลิก</button>
          <span class="status" id="status-msg" role="status" aria-live="polite"></span>
        </div>
      </form>
    </section>

    <section class="card">
      <h2>รายชื่อนักศึกษา (<span id="count">0</span>)</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 60px;">ID</th>
            <th>ชื่อนักศึกษา</th>
            <th>สาขาวิชา</th>
            <th style="width: 150px;">จัดการ</th>
          </tr>
        </thead>
        <tbody id="student-list"></tbody>
      </table>
    </section>
  </main>

  <script>
    const form = document.getElementById('student-form');
    const editId = document.getElementById('edit-id');
    const nameInput = document.getElementById('name');
    const majorInput = document.getElementById('major');
    const formTitle = document.getElementById('form-title');
    const cancelBtn = document.getElementById('cancel-btn');
    const statusMsg = document.getElementById('status-msg');
    const listEl = document.getElementById('student-list');
    const countEl = document.getElementById('count');

    function setStatus(text) {
      statusMsg.textContent = text;
    }

    function resetForm() {
      editId.value = '';
      form.reset();
      formTitle.textContent = 'เพิ่มข้อมูลนักศึกษา';
      cancelBtn.hidden = true;
    }

    async function loadStudents() {
      const res = await fetch('/students');
      const data = await res.json();
      countEl.textContent = data.length;
      if (!data.length) {
        listEl.innerHTML = '<tr><td colspan="4" class="empty">ยังไม่มีข้อมูลนักศึกษา</td></tr>';
        return;
      }
      listEl.innerHTML = data.map((s) => \`
        <tr>
          <td>\${s.id}</td>
          <td>\${s.name}</td>
          <td>\${s.major}</td>
          <td>
            <div class="row-actions">
              <button type="button" class="btn-edit" onclick="startEdit(\${s.id}, '\${s.name.replace(/'/g, "\\\\'")}', '\${s.major.replace(/'/g, "\\\\'")}')">แก้ไข</button>
              <button type="button" class="btn-del" onclick="removeStudent(\${s.id})">ลบ</button>
            </div>
          </td>
        </tr>
      \`).join('');
    }

    window.startEdit = function (id, name, major) {
      editId.value = id;
      nameInput.value = name;
      majorInput.value = major;
      formTitle.textContent = 'แก้ไขข้อมูลนักศึกษา (ID: ' + id + ')';
      cancelBtn.hidden = false;
      nameInput.focus();
    };

    window.removeStudent = async function (id) {
      const res = await fetch('/students/' + id, { method: 'DELETE' });
      if (res.ok) {
        setStatus('ลบข้อมูล ID ' + id + ' สำเร็จ');
        if (editId.value === String(id)) resetForm();
        await loadStudents();
      }
    };

    cancelBtn.addEventListener('click', () => {
      resetForm();
      setStatus('');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: nameInput.value.trim(),
        major: majorInput.value.trim()
      };
      if (!payload.name || !payload.major) return;

      const id = editId.value;
      const url = id ? '/students/' + id : '/students';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus(id ? 'แก้ไขข้อมูลสำเร็จ' : 'เพิ่มข้อมูลสำเร็จ');
        resetForm();
        await loadStudents();
      }
    });

    loadStudents();
  </script>
</body>
</html>`;

app.get('/', (req, res) => {
  res.send(homeHtml);
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
