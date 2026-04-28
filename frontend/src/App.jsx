import { useState } from "react";
import dataASN from "./data/dataASNBKPPD.json";
import SearchBox from "./component/SearchBox.jsx";
import Table from "./component/Table.jsx"

function Dashboard() {
    // console.log(dataASN);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState(Object.values(dataASN));

    /*const filteredData = dataASN.filter((item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase())
    );*/

    function handleSearch(value) {
        // console.log(value);
        setData(filteredData(dataASN,value));
        // console.log(data)           
    }

    /*const filteredData = dataASN.map((item) =>
        item.Nama.toLowerCase().includes(keyword.toLowerCase())
    );*/

    const filteredData = (arr, keyword) =>{
      return arr.filter(item => item.Nama.toLowerCase().includes(keyword.toLowerCase()))
    }

    

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
      <Table jsonASN={data} />
    </div>
    );
}

export default Dashboard;