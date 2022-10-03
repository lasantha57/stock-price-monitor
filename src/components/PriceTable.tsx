import { Paper, Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

import { Price } from '../common/types';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  [`& th`]: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.action.selected}`
  }
}));

interface PriceTableProps {
  prices: Price[];
  sourceId: number;
  tickerId: number;
}

export const PriceTable: React.FC<PriceTableProps> = ({ prices, sourceId, tickerId }) => {

  const filterPrices = prices.filter((price) => {
    if (sourceId === -1 || tickerId === -1) return false;
    return (price.sourceId === sourceId && price.tickerId === tickerId);
  });

  return (
    <TableContainer component={Paper}>
      {filterPrices.length === 0 ? 
      <Box my={3} display="flex" justifyContent="center" alignItems="center">
        No Data
      </Box> :
      <Table stickyHeader aria-label="A price table">
        <StyledTableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {filterPrices.slice(Math.max(filterPrices.length - 5, 0)).map((price) => (
            <StyledTableRow key={price.id} hover>
              <TableCell component="th" scope="row">
                {price.time}
              </TableCell>
              <TableCell>{price.price}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>
  );
};
