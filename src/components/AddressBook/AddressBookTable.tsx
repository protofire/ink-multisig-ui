import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import { getChain } from "@/config/chain";
import { AddressBookItemUi } from "@/domain/AddressBooks";
import { useDeleteAddressBook } from "@/hooks/addressBook/useDeleteAddressBook";
import { useUpdateAddressBook } from "@/hooks/addressBook/useUpdateAddressBook";
import { addressBookToAddressBookInput } from "@/services/localDB/transformers";
import { ChainId } from "@/services/useink/types";

import { AddressBookItem } from "./AddressBookItem";

type Props = {
  network: ChainId;
  addressBookItems: AddressBookItemUi[];
};

const AddressBookTable = ({ network, addressBookItems }: Props) => {
  const { updateAddressBook } = useUpdateAddressBook();
  const { deleteAddressBook } = useDeleteAddressBook();
  const chain = getChain(network);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>ADDRESS</TableCell>
            <TableCell>NETWORK</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addressBookItems?.map((addressBook) => {
            return (
              <AddressBookItem
                key={addressBook.address}
                addressBook={addressBookToAddressBookInput(addressBook)}
                chain={chain}
                deleteAddressBookItem={deleteAddressBook}
                updateAddressBookItem={updateAddressBook}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default AddressBookTable;
