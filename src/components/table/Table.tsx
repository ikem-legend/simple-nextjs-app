import { Table, Thead, Tbody, TableContainer } from "@chakra-ui/react";
import TableHeader from "./Header";

type TableWrapperProps = {
  headers: { title: string }[];
  hideHeader?: boolean;
  data: any[];
  Row: React.ComponentType<{ data: any; onRowClick: (data: any) => void }>;
  onRowClick: (data: any) => void;
};

export default function TableWrapper({
  headers,
  hideHeader = false,
  Row,
  onRowClick,
  data,
}: TableWrapperProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        {!hideHeader && (
          <Thead>
            <TableHeader headers={headers} />
          </Thead>
        )}
        <Tbody>
          {data.map((rowData, index) => (
            <Row key={index} data={rowData} onRowClick={onRowClick} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
