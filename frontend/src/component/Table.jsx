export default function Table({jsonASN}){
  // console.log(jsonASN);
  return(
    <table border="1" cellPadding="5" cellSpacing="0" width="60%">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIP</th>
          </tr>
        </thead>
        <tbody> 
        {jsonASN.map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td style={{textAlign:"left"}}>{item.Nama}</td>
            <td>{item.NIP}</td>
          </tr>
        ))}
        </tbody>
      </table>
  )
}