/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, gate, plate, result, direction) {
  return { id, date, gate, plate, result, direction };
}

const rows = [
  createData(0, '16 Mar, 2019', '3', 'ABC31ED', 'Authorized', 'Out'),
  createData(1, '16 Mar, 2019', '2', 'AAA00AA', 'Authorized','Out'),
  createData(2, '16 Mar, 2019', '1', 'EFG00DE', 'Not authorized','In'),
  createData(3, '16 Mar, 2019', '3', 'AAA00AA', 'Authorized','In'),
  createData(4, '15 Mar, 2019', '1', 'ABC31ED', 'Authorized','In'),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RecentAuthenticationTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Authentication</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Gate</TableCell>
            <TableCell>Plate</TableCell>
            <TableCell>Result</TableCell>
            <TableCell align="right">Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.gate}</TableCell>
              <TableCell>{row.plate}</TableCell>
              <TableCell>{row.result}</TableCell>
              <TableCell align="right">{row.direction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
