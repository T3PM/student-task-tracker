# Student Task Tracker Lab 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and run the `student-task-tracker` Node.js/Express app, package `Build-Output.zip`, capture real screenshots without Thai glyph boxes, and produce the completed Lab 3 worksheet PDF in `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker`.

**Architecture:** Initialize a standard Node.js + Express project in `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker`, verify `http://localhost:3000` returns the Thai HTML response, generate 4 real-output PNGs matching the template's exact pixel dimensions (`1100x390`, `1100x390`, `1100x470`, `1100x480`) using Chrome headless + Pillow, patch a copy of the original `.docx` XML in Python while preserving all styles, and export to PDF via Microsoft Word COM.

**Tech Stack:** Node.js v26.13.0, npm 11.20.0, Express, Python 3 (stdlib `zipfile` + `xml.etree.ElementTree`, Pillow), Google Chrome headless, Microsoft Word COM (`Word.Application` 16.0).

## Global Constraints

- Output directory: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker` only.
- Student info: `นายธีรเดช ผกามาด`, `68319010019 / ปวส. สาขาเทคโนโลยีสารสนเทศ`, group `- / 26 พ.ย. 2569`, teacher signature left completely blank.
- Keep original `.docx` layout, fonts, tables, headers, and footers intact.
- `Build-Output.zip` must include `server.js`, `package.json`, and `package-lock.json`, and must exclude `node_modules/`.
- All Thai text in screenshots and PDF must render cleanly with zero `□□□` missing glyphs.

## Review Focus

- `Build-Output.zip` accidentally including `node_modules/` -> verify with `zipfile.ZipFile.namelist()`.
- Thai characters in `server.js` response rendering as mojibake or missing boxes -> verify HTTP `Content-Type` UTF-8 header and inspect Chrome headless screenshot.
- Editing `.docx` XML dropping `<w:rPr>` formatting or breaking table column widths -> preserve `<w:rPr>` on every modified run and inspect every PDF page.
- Port `3000` already occupied during test run -> check port before starting and stop background server cleanly after verification.
- Pagination overflow on Activity 3 or Signature block -> inspect exported PDF page count and layout via `read_file`.

---

### Task 1: Initialize Project, Express Server, and Build-Output.zip

**Files:**
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\package.json`
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\package-lock.json`
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\server.js`
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\Build-Output.zip`

- [ ] **Step 1:** Run `npm init -y` and `npm install express` in `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker`.
- [ ] **Step 2:** Update `package.json` with `"main": "server.js"` and `"scripts": { "start": "node server.js" }`.
- [ ] **Step 3:** Write `server.js` per Worksheet Step 5 (`PORT = 3000`, `app.use(express.json())`, `GET /` returning the exact HTML).
- [ ] **Step 4:** Start `npm start` temporarily, fetch `http://localhost:3000` to verify HTTP 200 and Thai text `Build Process สำเร็จแล้ว!`, capture `http://localhost:3000` via Chrome headless, then stop the server.
- [ ] **Step 5:** Create `Build-Output.zip` containing `server.js`, `package.json`, and `package-lock.json` and assert `node_modules` is absent.

### Task 2: Capture and Format Real Screenshots (image1.png - image4.png)

**Files:**
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\_assets\image1.png` (`1100x390`)
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\_assets\image2.png` (`1100x390`)
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\_assets\image3.png` (`1100x470`)
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\_assets\image4.png` (`1100x480`)

- [ ] **Step 1:** Render clean HTML-to-PNG screenshots via Chrome headless using real captured terminal output (`v26.13.0`, `11.20.0`, `npm install express`, `npm start`), actual project tree, and actual `http://localhost:3000` page with Thai system fonts (`Segoe UI` / `Tahoma` / `Leelawadee UI`).
- [ ] **Step 2:** Verify exact pixel dimensions match `(1100, 390)`, `(1100, 390)`, `(1100, 470)`, `(1100, 480)` and visually inspect `image1.png`–`image4.png` using `read_file`.

### Task 3: Populate Worksheet DOCX and Export to PDF

**Files:**
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\ใบงานที่3_Build_Student_Task_Tracker_ธีรเดช_019.docx`
- Create: `C:\Users\sakae\.gemini\antigravity\scratch\student-task-tracker\ใบงานที่3_Build_Student_Task_Tracker_ธีรเดช_019.pdf`

- [ ] **Step 1:** Clone `C:\Users\sakae\Downloads\ใบงานที่3_Build_Student_Task_Tracker (1).docx`, replace `word/media/image1.png`..`image4.png`, and update `word/document.xml` runs for header table, Step 1 versions, Activity 1-3, Summary, and Student signature (preserving `<w:rPr>` and leaving teacher signature blank).
- [ ] **Step 2:** Export `.docx` to `.pdf` using Microsoft Word COM (`ExportAsFixedFormat`, `wdExportFormatPDF = 17`).
- [ ] **Step 3:** Clean up temporary `_assets/` if not needed or keep clean, then inspect every page of the exported PDF via `read_file` to verify layout, Thai rendering, images, and completeness.
