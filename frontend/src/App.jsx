import { useState } from "react";
import dataASN from "./data/dataASNBKPPD.json";

function Dashboard() {
  // console.log(dataASN);
  const [keyword, setKeyword] = useState("");

  /*const filteredData = dataASN.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase())
  );*/

  return (
    <div style={{display:"flex", justifyAlign:"center", alignItems:"center", flexDirection:"column"}}>
      <h1>Data ASN</h1>

      {/*kotak pencarian*/}
      <input
        type="text"
        placeholder="Cari nama ASN..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      {/*coba tampil di layar */}
      <p style={{
        paddingBottom: "10px"
      }}>{keyword}</p>

      {/*tabel data*/}
      <table border="1" cellpadding="5" cellspacing="0" width="60%">
        <thead>
          <tr>
            <th>No</th> <th>Nama</th> <th>NIP</th>
          </tr>
        </thead>
        <tbody> 
        {dataASN.map((item, index) => (
          <tr>
            <td>{index+1}</td> <td style={{textAlign:"left"}}>{item.Nama}</td> <td>{item.NIP}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;