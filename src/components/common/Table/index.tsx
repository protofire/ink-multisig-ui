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
  format?: (value: string | number) => string;
};

type Row = {
  [key: string]: string | number;
};

type GenericTableProps = {
  columns: Column[];
  rows: Row[];
};

export default function GenericTable({ columns, rows }: GenericTableProps) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, background: theme.palette.grey[800] }}
        aria-label="generic table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "2px solid black" }}>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align || "left"}
                sx={{ color: theme.palette.grey.A400 }}
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
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <StyledTableCell
                    key={column.id}
                    align={column.align || "left"}
                  >
                    {column.format ? column.format(value) : String(value)}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
