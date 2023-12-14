import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import { StyledTableCell } from "./styled";

export type Column = {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: string | number) => React.ReactNode;
};

type Row = {
  [key: string]: string | number;
};

type GenericTableProps = {
  columns: Column[];
  rows: Row[];
  action: (row: Row) => void;
};

export default function GenericTable({
  columns,
  rows,
  action,
}: GenericTableProps) {
  const theme = useTheme();

  const enhancedColumns = [...columns, { id: "transfer", label: "" }];

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, background: theme.palette.grey[800] }}
        aria-label="generic table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "2px solid black" }}>
            {enhancedColumns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align || "left"}
                sx={{
                  color: theme.palette.grey.A400,
                  width: column.id === "transfer" ? "100px" : "auto", // Narrower width for 'Actions' column
                }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child": {
                  borderColor: "transparent",
                },
                borderBottom: "2px solid black",
              }}
            >
              {enhancedColumns.map((column) => {
                if (column.id === "transfer") {
                  return (
                    <StyledTableCell key={column.id} sx={{ width: "100px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={row.balance <= "0"}
                        onClick={() => action(row)}
                      >
                        Transfer
                      </Button>
                    </StyledTableCell>
                  );
                } else {
                  const value = row[column.id];
                  return (
                    <StyledTableCell
                      key={column.id}
                      align={column.align || "left"}
                    >
                      {column.render ? column.render(value) : String(value)}
                    </StyledTableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
