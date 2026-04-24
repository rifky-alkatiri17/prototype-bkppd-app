import { useState } from "react";
import dataASN from "./data/dataASNBKPPD.json";
import SearchBox from "./component/SearchBox.jsx";
import Table from "./component/Table.jsx"

function Dashboard() {
    // console.log(dataASN);
    const [keyword, setKeyword] = useState("");
    const [nilai, setNilai] = useState([]);

    /*const filteredData = dataASN.filter((item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase())
    );*/

    function handleSearch(value){
      console.log(value);
      setKeyword(value); //hanya untuk debugging
      // setNilai()
    }

    const filteredData = dataASN.map((item) =>
      item.Nama.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log(filteredData.Nama);

    return (
        <div style={{display:"flex", justifyAlign:"center", alignItems:"center", flexDirection:"column"}}>
      <h1>Data ASN</h1>

      {/*kotak pencarian*/}
      <SearchBox onHandleSearch={handleSearch} />

      {/*coba tampil di layar */}
      <p style={{
        paddingBottom: "10px"
      }}>{keyword}</p>

      {/*tabel data*/}
      <Table jsonASN={dataASN} />
    </div>
    );
}

export default Dashboard;