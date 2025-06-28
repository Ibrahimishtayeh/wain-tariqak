const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// لتفادي مشاكل الكروس اوريجن
app.use(cors());

// واجهة ترجع محتوى ملف data.json
app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, jsonData) => {
    if (err) {
      res.status(500).json({ error: "فشل في قراءة البيانات" });
    } else {
      res.json(JSON.parse(jsonData));
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});
