import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ContractParam } from "@/domain/repositores/ISquidDbRepository";

interface Props {
  argName: string;
  argValue: ContractParam[];
  argKey: string;
}

export function ArgsTable({ argValue: value, argName: name, argKey }: Props) {
  return (
    <Stack
      display="flex"
      width="100%"
      direction="row"
      alignItems="center"
      pt={2}
      pb={2}
    >
      <Grid
        item
        sx={{
          color: "#837376",
        }}
        xs={3}
        sm={3}
        md={3}
      >
        {`${name} (decoded):`}
      </Grid>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            overflow: "auto",
          }}
        >
          <Table aria-label={`args-table-${argKey}`} size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    paddingLeft: "0.4rem",
                    color: "#837376",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    width: "5rem",
                  }}
                >
                  name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#837376",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  value
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {value.map((element, index) => (
                <TableRow
                  key={element.name + index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ color: "#837376", paddingLeft: "0.4rem" }}
                    scope="row"
                  >{`${element.name}:`}</TableCell>
                  <TableCell colSpan={3}>{element.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
