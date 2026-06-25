/*hook react
------------*/
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from 'react-router-dom';

/*data
------*/
// import dataASN from "./data/dataASNBKPPD.json";

/*component
-----------*/
import SearchBox from "./component/SearchBox.jsx";
import Table from "./component/Table.jsx";
import Button from "./component/Button.jsx";
import Pagination from "./component/Pagination.jsx";

/*component from lib
--------------------*/
// import { Button } from "@chakra-ui/react";

/*framework/library
-------------------*/
import 'bootstrap/dist/css/bootstrap.min.css';


/*main component
----------------*/
function Dashboard() {
    // console.log(dataASN);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [dataFilter, setDataFilter] = useState([]);

    // const [searchParams] = useSearchParams();
    // const page = searchParams.get('page');
    // console.log(page);

    const { page } = useParams(); // ambil data dari params url
    // console.log(page);

    const getData = async (hal) => {
        const page = Number(hal) || 1;
        const res = await fetch('http://localhost:3000/' + page);
        const response = await res.json();
        setData(response);
    }

    /*ini langsung jalan saat main comp. dijalankan
    -----------------------------------------------*/
    useEffect(() => {
        getData(page);
        // console.log(data)
    }, []);


    function handleSearch(value) {
        const hasil = data.filter(item =>
            item.nama.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(hasil);
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
          <Table jsonASN={filteredData} />
          <Pagination />
        </div>
    );
}

export default Dashboard;