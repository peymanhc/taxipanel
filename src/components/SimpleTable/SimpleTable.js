import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0c1d34",
    color: theme.palette.common.white,
    textAlign: "right",
  },
  body: {
    fontSize: 14,
    textAlign: "right",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    direction: "rtl",
    textAlign: "right",
  },
}));

export default function SimpleTable({ head,body }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {head.map((item, i) => (
              <StyledTableCell>{item.title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
