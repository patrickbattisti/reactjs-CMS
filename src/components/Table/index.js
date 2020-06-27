import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import ConfirmDelete from "./components/ConfirmDelete";
import EmptyMessage from "./components/EmptyMessage";
import Loading from "./components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  table: {
    maxHeight: window.innerHeight - 217,
  },
  title: {
    padding: "20px 0",
  },
  container: {
    width: "80%",
    margin: "0 auto",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const StyledTableRow = withStyles({
  root: {
    cursor: "pointer",
  },
})(TableRow);

export default function ({
  columns,
  rows,
  model,
  rowName,
  onDelete,
  setUpdateRow,
  setCreateRow,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteRow, setDeleteRow] = useState({
    open: false,
    row: {},
  });

  const onCloseDelete = () => setDeleteRow({ open: false });

  const onOpenDelete = (row) => {
    setDeleteRow({ open: true, row });
  };

  const onOpenUpdate = (row) => {
    setUpdateRow({ open: true, row });
  };

  const onOpenCreate = () => {
    setCreateRow({ open: true });
  };

  const _onDelete = () => {
    onDelete(deleteRow.row);
    onCloseDelete();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const TableHeader = () => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        className={classes.tableCell}
        style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
      >
        {column.label}
      </TableCell>
    ));
  };

  const Rows = ({ row }) => {
    const getColumn = ({ column, value }) => {
      if (column.format) {
        return column.format(value);
      }

      if (column.id === "edit") {
        return (
          <IconButton
            style={{ margin: "-10px -16px" }}
            onClick={() => onOpenUpdate(row)}
          >
            <EditIcon color="action" />
          </IconButton>
        );
      }

      if (column.id === "delete") {
        return (
          <IconButton
            style={{ margin: "-10px -16px" }}
            onClick={() => onOpenDelete(row)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        );
      }

      return (
        <div className={classes.column} style={{ maxWidth: column.maxWidth }}>
          {value}
        </div>
      );
    };

    return columns.map((column) => {
      const value = row[column.id];
      return (
        <TableCell key={column.id} align={column.align}>
          {getColumn({ column, value })}
        </TableCell>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography color="textPrimary" variant="h4" className={classes.title}>
          {model}
        </Typography>
        <Fab
          variant="extended"
          onClick={onOpenCreate}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            borderRadius: "1px solid #aaa",
          }}
        >
          <AddIcon className={classes.extendedIcon} />
          Create {rowName}
        </Fab>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {(rows || [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <Rows {...{ row }} />
                    </StyledTableRow>
                  );
                })}
              {rows?.length === 0 && <EmptyMessage />}
              {rows === null && <Loading />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <ConfirmDelete
        {...{
          open: deleteRow.open,
          onClose: onCloseDelete,
          onDelete: _onDelete,
          rowName,
        }}
      />
    </div>
  );
}
