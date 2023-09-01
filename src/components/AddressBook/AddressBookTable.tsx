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
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

import { getChain } from "@/config/chain";
import { setLocalStorageState } from "@/utils/localStorage";

import CopyButton from "../common/CopyButton";
import OpenNewTabButton from "../common/OpenNewTabButton";
import SvgIconButton from "../common/SvgIconButton";
import NetworkBadge from "../NetworkBadge";
import { AddressBookInput } from ".";

// TODO:
// Remove this mock variable, replace with true value
const mockURL = "https://polkadot.subscan.io/";

const ITEM_LOCAL_STORAGE = "addressBook";

type Props = {
  data: AddressBookInput[] | undefined;
  setAddressBookData: Dispatch<SetStateAction<AddressBookInput[] | undefined>>;
};

const AddressBookTable = ({ data, setAddressBookData }: Props) => {
  const [editInput, setEditInput] = useState<AddressBookInput[]>([]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setEditInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = (index: number) => {
    if (!data) return;
    const newArray = data.filter((_, i) => index !== i);
    setAddressBookData(newArray);
    setLocalStorageState(ITEM_LOCAL_STORAGE, newArray);
  };

  const handleSave = (index: number) => {
    if (!data) return;
    const copyData = [...data];
    let element = copyData[index];
    element = {
      ...element,
      ...editInput,
      isEditable: false,
    } as AddressBookInput;
    copyData[index] = element;
    setAddressBookData(copyData);
    setLocalStorageState(ITEM_LOCAL_STORAGE, copyData);
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
          {data?.map((addressBook, index) => {
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
                        label="Name"
                        onChange={(e) => handleChange(e)}
                        defaultValue={addressBook.name}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        onChange={(e) => handleChange(e)}
                        defaultValue={addressBook.address}
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
                        {addressBook.address}
                      </Typography>{" "}
                      <CopyButton text={addressBook?.address as string} />
                      <OpenNewTabButton text={mockURL} />
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
                  {addressBook.isEditable ? (
                    <SvgIconButton
                      initialToolTipText="Save"
                      icon={TaskAlt}
                      onClick={() => handleSave(index)}
                    />
                  ) : (
                    <>
                      <SvgIconButton
                        initialToolTipText="Edit"
                        icon={Edit}
                        onClick={() => handleEdit(addressBook.address)}
                      />
                      <SvgIconButton
                        initialToolTipText="Delete"
                        icon={Delete}
                        onClick={() => handleDelete(index)}
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
