import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const DynamicTable = ({ data }: any) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    
    // Gera as colunas dinamicamente com base nas chaves dos dados
    const columns = Object.keys(data[0]).map(key => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitaliza o nome da coluna
    }));
    
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map(col => (
                  <TableCell key={col.id}>{row[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default DynamicTable;
  