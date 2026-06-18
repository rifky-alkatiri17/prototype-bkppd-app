/*hook react
------------*/
import { useState, useEffect } from "react";

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
    // const [dataFilter, setDataFilter] = useState([]);

    const getData = async () => {
        const res = await fetch('http://localhost:3000');
        const response = await res.json();
        setData(response);
        console.log(response);
        // return response.data
    }


    useEffect(() => {
        getData()
    }, []);


    function handleSearch(value) {
        setData(filteredData(data, value));
        console.log(data)
    }

    const filteredData = (arr, keyword) => {
        return arr.filter(item => item.nama.toLowerCase().includes(keyword.toLowerCase()))
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
          <Pagination />
        </div>
    );
}

export default Dashboard;