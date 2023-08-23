import { Stack } from "@mui/material";
import Image from "next/image";
import * as React from "react";

import { truncateAddress } from "@/utils/formatString";

import {
  BoxStyled,
  ListItemtyled,
  StyledBox,
  StyledButton,
  StyledList,
  TransactionQueueStyled,
} from "./styled";

export const TransactionQueueWidget = () => {
  const data = [
    {
      address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      type: "Send",
      value: "300",
      token: "ROC",
      txValidation: "1",
    },
    {
      address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      type: "Receive",
      value: "300",
      token: "ROC",
      txValidation: "1",
    },
    {
      address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      type: "Send",
      value: "300",
      token: "ROC",
      txValidation: "1",
    },
    {
      address: "5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B",
      type: "Receive",
      value: "300",
      token: "ROC",
      txValidation: "1",
    },
  ];
  return (
    <TransactionQueueStyled border={false}>
      <StyledList>
        {data.map((a, index) => (
          <ListItemtyled key={index}>
            <StyledBox>
              {a.type === "Send" ? (
                <Image
                  src="/assets/arrow-receive.svg"
                  alt="Arrow receive"
                  priority
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/assets/arrow-send.svg"
                  alt="Arrow receive"
                  priority
                  width={40}
                  height={40}
                />
              )}
              <Stack
                sx={{
                  marginLeft: "1.5rem",
                  minWidth: "100px",
                  width: "280px",
                }}
              >
                <span>{a.type}</span>
                <p>{truncateAddress(a.address as string, 12)}</p>
              </Stack>
              <BoxStyled>
                {a.type === "Send" ? "-" : "+"} {`${a.value} ${a.token}`}
              </BoxStyled>

              <span>
                {a.txValidation}/{a.txValidation}
              </span>
            </StyledBox>
          </ListItemtyled>
        ))}
      </StyledList>
      <StyledButton
        style={{
          color: "#FFE873",
        }}
      >
        {" "}
        View All{" "}
      </StyledButton>
    </TransactionQueueStyled>
  );
};
