import { Delete, Edit, TaskAlt } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getChain } from "@/config/chain";
import { AddressBookInput, AddressBookItemUi } from "@/domain/AddressBooks";
import { useDeleteAddressBook } from "@/hooks/addressBook/useDeleteAddressBook";
import { useUpdateAddressBook } from "@/hooks/addressBook/useUpdateAddressBook";
import { ChainId } from "@/services/useink/types";
import { getExplorerUrl } from "@/utils/blockchain";

import CopyButton from "../common/CopyButton";
import OpenNewTabButton from "../common/OpenNewTabButton";
import SvgIconButton from "../common/SvgIconButton";
import NetworkBadge from "../NetworkBadge";

type Props = {
  network: ChainId;
  addressBookItems: AddressBookItemUi[];
};

const AddressBookTable = ({ network, addressBookItems }: Props) => {
  const { updateAddressBook, handleChange } = useUpdateAddressBook();
  const { deleteAddressBook } = useDeleteAddressBook();
  const [tempData, setTempData] = useState<AddressBookInput[]>([]);

  useEffect(() => {
    setTempData(
      addressBookItems.map((item) => ({ ...item, isEditing: false }))
    );
  }, [addressBookItems]);

  const editAddressBook = (address: string) => {
    const tempData = addressBookItems as AddressBookInput[];
    const obj = tempData?.map((element) => {
      if (element.address === address) {
        return {
          ...element,
          isEditing: !element.isEditing,
        };
      }
      return element;
    });
    setTempData(obj);
  };

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
          {tempData?.map((addressBook, index) => {
            const chain = getChain(addressBook.networkId);
            return (
              <TableRow key={index}>
                {addressBook.isEditing ? (
                  <>
                    <TableCell>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Required"
                        onChange={(e) => handleChange(e)}
                        defaultValue={addressBook.name}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Required"
                        onChange={(e) => handleChange(e)}
                        defaultValue={addressBook.formattedAddress}
                        sx={{ minWidth: "33rem" }}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <Typography variant="body1">
                        {addressBook.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" component="span">
                        {addressBook.formattedAddress}
                      </Typography>{" "}
                      <CopyButton
                        text={addressBook?.formattedAddress as string}
                      />
                      <OpenNewTabButton
                        text={getExplorerUrl(
                          network,
                          addressBook.formattedAddress
                        )}
                      />
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <NetworkBadge
                    logo={chain.logo.src}
                    description={chain.logo.alt}
                    logoSize={{ width: 16, height: 16 }}
                    name={chain.name}
                    showTooltip={false}
                  ></NetworkBadge>
                </TableCell>
                <TableCell>
                  {addressBook.isEditing ? (
                    <SvgIconButton
                      initialToolTipText="Save"
                      icon={TaskAlt}
                      onClick={() => updateAddressBook(addressBook.address)}
                    />
                  ) : (
                    <>
                      <SvgIconButton
                        initialToolTipText="Edit"
                        icon={Edit}
                        onClick={() => editAddressBook(addressBook.address)}
                      />
                      <SvgIconButton
                        initialToolTipText="Delete"
                        icon={Delete}
                        onClick={() => deleteAddressBook(addressBook.address)}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default AddressBookTable;
