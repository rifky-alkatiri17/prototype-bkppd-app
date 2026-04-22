const express = require("express");
const multer = require("multer");
const csvToJson = require("convert-csv-to-json");
const fs = require("fs");

const app = express();

//config
app.use(express.static('public'));
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        console.log(req.file);
        const filePath = req.file.path;

        const json = csvToJson.fieldDelimiter(';').getJsonFromCsv(filePath);

        fs.unlinkSync(filePath); // hapus file setelah dipakai

        /*res.json({
            success: true,
            data: json
        });*/

         // tampilkan + link download
        res.send(`
          <h2>Hasil Convert JSON</h2>
          <pre>${JSON.stringify(json, null, 2)}</pre>
          <a href="/download?file=${outputFile}">Download JSON</a>`);


    } catch (err) {
        res.status(500).json({ error: "Gagal convert CSV" });
    }
});

//route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
    // res.sendFile(__dirname + '/public/coba.html')
});

// route download
app.get('/download', (req, res) => {
    console.log(req.query);
    const file = req.query.file;
    res.download(file);
});

app.listen(3001, () => console.log(`Server jalan di https://localhost:3001`));