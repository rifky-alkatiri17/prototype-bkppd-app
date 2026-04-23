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
         //simpan file csv dari input (otomatis masuk folder upload oleh multer)
        const filePath = req.file.path;

        // convert csv to json lalu simpan dalam variabel
        const json = csvToJson.fieldDelimiter(';').getJsonFromCsv(filePath);

        // rangkai nama untuk output
        const outputPath = `results/${Date.now()}.json`;

        // simpan hasil convert json ke folder results
        // fs.writeFileSync(path,data,options)
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

        /*res.json({
            success: true,
            data: json
        });*

         // tampilkan + link download
        /*res.send(`
          <h2>Hasil Convert JSON</h2>
          <pre>${JSON.stringify(json, null, 2)}</pre>
          <a href="/download?berkas=${outputPath}">Download JSON</a>`);*/

        res.send(`
          <h2>Hasil Convert JSON</h2>
          <p>${outputPath.slice(8)}</p>
          <a href="/download?berkas=${outputPath}">Download JSON</a>`);

        fs.unlinkSync(filePath); // hapus file setelah dipakai

    } catch (err) {
        res.status(500).json({ error: "Gagal convert CSV" });
    }
});

//route
/*app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html')
    // res.sendFile(__dirname + '/public/coba.html')
});*/

// route download
app.get('/download', (req, res) => {
    console.log(JSON.stringify(req.query, null, 2));
    const file = req.query.berkas;
    res.download(file);
    // console.log(__dirname)
});

app.listen(3000, () => console.log(`Server jalan di http://localhost:3000`));