export default function Table({ jsonASN }) {
    // console.log(jsonASN);
    return (
        <table border="1" cellPadding="5" cellSpacing="0" width="60%">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIP</th>
            <th>No. HP</th>
            <th>Jenis ASN</th>
            <th>Unit Kerja</th>
          </tr>
        </thead>
        <tbody> 
        {jsonASN.map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td style={{textAlign:"left"}}>{item.nama}</td>
            <td>{item.nip_baru}</td>
            <td>{item.nomor_hp}</td>
            <td>{item.status_cpns_pns}</td>
            <td>{item.unor_induk}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
}