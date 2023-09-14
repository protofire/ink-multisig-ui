import { Delete, Edit, Save } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getChain } from "@/config/chain";
import { AddressBookInput } from "@/domain/AddressBooks";
import { useDeleteAddressBook } from "@/hooks/addressBook/useDeleteAddressBook";
import { useListAddressBook } from "@/hooks/addressBook/useListAddressBook";
import { useUpdateAddressBook } from "@/hooks/addressBook/useUpdateAddressBook";
import { ChainId } from "@/services/useink/types";

import CopyButton from "../common/CopyButton";
import OpenNewTabButton from "../common/OpenNewTabButton";
import SvgIconButton from "../common/SvgIconButton";
import NetworkBadge from "../NetworkBadge";

// TODO:
// Remove this mock variable, replace with true value
const mockURL = "https://polkadot.subscan.io/";

type Props = {
  network: ChainId;
};

const AddressBookTable = ({ network }: Props) => {
  const { data } = useListAddressBook(network);
  const { updateAddressBook, handleChange } = useUpdateAddressBook();
  const { deleteAddressBook } = useDeleteAddressBook();
  const [tempData, setTempData] = useState<AddressBookInput[]>([]);

  useEffect(() => {
    setTempData(data as AddressBookInput[]);
  }, [data]);

  const editAddressBook = (address: string) => {
    const tempData = data as AddressBookInput[];
    const obj = tempData?.map((element) => {
      if (element.address === address) {
        return {
          ...element,
          isEditable: !element.isEditable,
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
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Network</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tempData?.map((addressBook, index) => {
            const chain = getChain(addressBook.networkId);
            return (
              <TableRow key={index}>
                {addressBook.isEditable ? (
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
                        defaultValue={addressBook.address}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{addressBook.name}</TableCell>
                    <TableCell>
                      {addressBook.address}{" "}
                      <CopyButton text={addressBook?.address as string} />
                      <OpenNewTabButton text={mockURL} />
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <NetworkBadge
                    logo={chain.logo.src}
                    description={chain.logo.alt}
                    logoSize={{ width: 14, height: 14 }}
                    name={chain.name}
                    showTooltip={false}
                  ></NetworkBadge>
                </TableCell>
                <TableCell>
                  {addressBook.isEditable ? (
                    <SvgIconButton
                      initialToolTipText="Save"
                      icon={Save}
                      onClick={() => updateAddressBook(addressBook.address)}
                    />
                  ) : (
                    <SvgIconButton
                      initialToolTipText="Edit"
                      icon={Edit}
                      onClick={() => editAddressBook(addressBook.address)}
                    />
                  )}
                  <SvgIconButton
                    initialToolTipText="Delete"
                    icon={Delete}
                    onClick={() => deleteAddressBook(addressBook.address)}
                  />
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
