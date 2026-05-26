import { useState, useEffect } from "react";
import dataASN from "./data/dataASNBKPPD.json";
import SearchBox from "./component/SearchBox.jsx";
import Table from "./component/Table.jsx"
import Button from "./component/Button.jsx"

function Dashboard() {
    // console.log(dataASN);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([]);

    const getData = async ()=>{
        const res = await fetch('http://192.168.110.111:1996/pegawai');
        const response = await res.json();
        setData(response.data);        
        console.log(response.data);
        // return response.data
    }

    useEffect(()=>{
        getData()      
    },[]); 


    function handleSearch(value) {
        setData(filteredData(dataASN, value));
    }    

    const filteredData = (arr, keyword) => {
        return arr.filter(item => item.Nama.toLowerCase().includes(keyword.toLowerCase()))
    }



    return (
        <div style={{display:"flex", justifyAlign:"center", alignItems:"center", flexDirection:"column"}}>
          <h1>Data ASN</h1>
          {/*Tombol Add*/}
          <Button text="Tambah Data" />

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