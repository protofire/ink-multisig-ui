import { Delete, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";

import { AddressBookWidgetStyled, NoItems, StyledList } from "./styled";

export const AddressBook = () => {
  const { network } = usePolkadotContext();
  const { data } = useListAddressBook(network as string);

  return (
    <AddressBookWidgetStyled border={false}>
      {data?.length == 0 ? (
        <StyledList>
          <NoItems>There are no registered address in this network</NoItems>
        </StyledList>
      ) : (
        <>
          {/* <AddressBookItem data={data} /> */}
          <Table>
            <TableHead>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Network</TableCell>
            </TableHead>
            <TableBody>
              {data?.map((addressBook, index) => (
                <TableRow key={index}>
                  <TableCell>{addressBook.name}</TableCell>
                  <TableCell>{addressBook.address}</TableCell>
                  <TableCell>{addressBook.networkId}</TableCell>
                  <TableCell>
                    <Edit />
                    <Delete />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </AddressBookWidgetStyled>
  );
};
