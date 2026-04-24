import { useState } from "react";

export default function SearchBox({onHandleSearch}){
  const nama = "Rifki Alkatiri";
  // const [keyword, setKeyword] = useState("");

  return(
    <input
        type="text"
        placeholder="Cari nama ASN..."
        // value={keyword}
        onChange={ (e) => onHandleSearch(e.target.value) }
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />
  )
}