import { Delete, Edit, TaskAlt } from "@mui/icons-material";
import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";

import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";
import SvgIconButton from "@/components/common/SvgIconButton";
import NetworkBadge from "@/components/NetworkBadge";
import { ChainExtended } from "@/config/chain";
import { AddressBookInput } from "@/domain/AddressBooks";
import { UseDeleteAddressBookReturn } from "@/hooks/addressBook/useDeleteAddressBook";
import { UseUpdateAddressBook } from "@/hooks/addressBook/useUpdateAddressBook";
import { useForm } from "@/hooks/useForm";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRecentlyClicked } from "@/hooks/useRecentlyClicked";
import { getExplorerUrl } from "@/utils/blockchain";
import { notEmpty, onlyAddress } from "@/utils/inputValidation";

interface Props {
  addressBook: AddressBookInput;
  chain: ChainExtended;
  deleteAddressBookItem: UseDeleteAddressBookReturn["deleteAddressBook"];
  updateAddressBookItem: UseUpdateAddressBook["updateAddressBook"];
}

export function AddressBookItem({
  addressBook,
  chain,
  deleteAddressBookItem: deleteAddressBook,
  updateAddressBookItem,
}: Props) {
  const formRef = useRef<HTMLTableRowElement>(null);
  const { register, handleSubmit, errors, values, setValue, isValid, touched } =
    useForm(addressBook);
  useOnClickOutside(formRef, () => setValue("isEditing", false), ["Escape"]);
  const { recentlyClicked, ref: refSaveButton } = useRecentlyClicked(50000);
  const network = chain.id;
  const isEditing = values.isEditing;
  const _isValid =
    isValid && Object.values(touched).length > 0 && !recentlyClicked;

  return (
    <TableRow ref={formRef}>
      {isEditing ? (
        <>
          <TableCell>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              {...register("name", [notEmpty])}
              error={!!errors.name}
              helperText={errors.name}
            />
          </TableCell>
          <TableCell>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              sx={{ minWidth: "33rem" }}
              {...register("address", [notEmpty, onlyAddress])}
              error={!!errors.address}
              helperText={errors.address}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <Typography variant="body1">{addressBook.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" component="span">
              {addressBook.formattedAddress}
            </Typography>{" "}
            <CopyButton text={addressBook?.formattedAddress as string} />
            <OpenNewTabButton
              text={getExplorerUrl(network, addressBook.formattedAddress)}
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
        {isEditing ? (
          <SvgIconButton
            ref={refSaveButton}
            initialToolTipText="Save"
            icon={TaskAlt}
            color={_isValid ? "success" : "default"}
            onClick={() => {
              setValue("isEditing", false);
              updateAddressBookItem({
                oldAddressBook: addressBook,
                newAddressBook: values,
              });
            }}
            type="submit"
            isLoading={recentlyClicked}
          />
        ) : (
          <>
            <SvgIconButton
              initialToolTipText="Edit"
              icon={Edit}
              onClick={() => setValue("isEditing", true)}
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
}
