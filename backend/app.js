const express = require("express");
const multer = require("multer");
const csvToJson = require("convert-csv-to-json");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const filePath = req.file.path;

    const json = csvToJson.getJsonFromCsv(filePath);

    fs.unlinkSync(filePath); // hapus file setelah dipakai

    res.json({
      success: true,
      data: json
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal convert CSV" });
  }
});

app.listen(3001, () => console.log("Server jalan di 3001"));