/*core modules
--------------*/
const fs = require("fs");

/*npm or 3rd party modules
--------------------------*/
const express = require("express");
const app = express();
const multer = require("multer"); //untuk menangani upload file dr form
const csvToJson = require("convert-csv-to-json");
// const mysql = require('mysql2');
const cors = require('cors');

/*user defined modules
----------------------*/
const db = require('./utility/functions');

/*variabel dan function
------------------------*/
const jumlahDataPerHalaman = 10;

async function getJlhData() {
    /*cara 1 (lebih efisien)
    --------*/
    const [jumlah] = await db.query('SELECT COUNT(*) AS jlhData FROM tb_asn');
    /*cara 2
    -------*/ 
    // const [rows] = await db.query('SELECT * FROM tb_asn');
    // const jumlah = rows.length;
    return jumlah[0].jlhData;
}

async function getData(page) {
    const jumlahDataPerHalaman = 10;
    const jumlahData = await getJlhData();
    const jumlahHalaman = Math.ceil(jumlahData/jumlahDataPerHalaman)
    // const halamanAktif = page? page : 1 ;
    const halamanAktif = Number(page) || 1;
    const awalData = (jumlahDataPerHalaman * halamanAktif) - jumlahDataPerHalaman;

    const [rows] = await db.query('SELECT nama,nip_baru,nomor_hp,unor_induk,status_cpns_pns FROM tb_asn LIMIT ?, ?', [awalData, jumlahDataPerHalaman]);
    // console.log(rows);
    return rows;
}



/*config
--------*/
// app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:5173'
}));
const upload = multer({ dest: "uploads/" });

/*route
-------*/
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        console.log(req.file);
        /*simpan file csv dari input (otomatis masuk folder upload oleh multer)
        -----------------------------------------------------------------------*/
        const filePath = req.file.path;

        /*convert csv to json lalu simpan dalam variabel
        ------------------------------------------------*/
        const json = csvToJson.fieldDelimiter(';').getJsonFromCsv(filePath);

        /*rangkai nama untuk output
        ---------------------------*/
        const outputPath = `results/${Date.now()}.json`;

        /*simpan hasil convert json ke folder results
        ----------------------------------------------*/
        // fs.writeFileSync(path,data,options)
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

        /*res.json({
            success: true,
            data: json
        });*

         /*tampilkan + link download
         ----------------------------*/
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
app.get('/', async (req, res) => {
    console.log(await getJlhData());   
    res.send(await getData());
});

app.get('/:page', async (req, res) => {
    console.log(await getJlhData());    
    res.send(await getData(req.params.page));
});

// route download
app.get('/download', (req, res) => {
    console.log(JSON.stringify(req.query, null, 2));
    const file = req.query.berkas;
    res.download(file);
    // console.log(__dirname)
});

app.listen(3000, () => console.log(`Server jalan di http://localhost:3000`));