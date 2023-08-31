import { Delete, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback } from "react";

import { getChain } from "@/config/chain";

import CopyButton from "../common/CopyButton";
import OpenNewTabButton from "../common/OpenNewTabButton";
import SvgIconButton from "../common/SvgIconButton";
import NetworkBadge from "../NetworkBadge";
import { AddressBookInput } from ".";

// TODO:
// Remove this mock variable, replace with true value
const mockURL = "https://polkadot.subscan.io/";

type Props = {
  data: AddressBookInput[] | undefined;
  setAddressBookData: Dispatch<SetStateAction<AddressBookInput[] | undefined>>;
};

const AddressBookTable = ({ data, setAddressBookData }: Props) => {
  const handleEdit = useCallback(
    (address: string) => {
      const obj = data?.map((element) => {
        if (element.address === address) {
          return {
            ...element,
            isEditable: !element.isEditable,
          };
        }
        return element;
      });

      setAddressBookData(obj);
    },
    [data, setAddressBookData]
  );

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
          {data?.map((addressBook, index) => {
            const chain = getChain(addressBook.networkId);
            return (
              <TableRow key={index}>
                {addressBook.isEditable ? (
                  <>
                    <TableCell>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue={addressBook.name}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
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
                  <SvgIconButton
                    initialToolTipText="Edit"
                    icon={Edit}
                    onClick={() => handleEdit(addressBook.address)}
                  />
                  <SvgIconButton
                    initialToolTipText="Delete"
                    icon={Delete}
                    onClick={() => undefined}
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
