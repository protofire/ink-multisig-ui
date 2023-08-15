import { Avatar, SelectChangeEvent, Stack } from "@mui/material";

import { ChainExtended, CHAINS_ALLOWED } from "@/config/chain";
import { SetState } from "@/domain/utilityReactTypes";
import { ChainId } from "@/services/useink/types";

import { StyledMenuItem, StyledSelect } from "./styled";

export function NetworkSelect({
  currentChain,
  onChange,
}: {
  currentChain: string | undefined;
  onChange: SetState<ChainId | undefined>;
}) {
  const _handleChangeChain = (event: SelectChangeEvent<unknown>) => {
    const chainId = event.target.value as ChainId;
    onChange(chainId);
  };
  const chain = CHAINS_ALLOWED.find(
    (chain: ChainExtended) => chain.id === currentChain
  );
  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={chain?.id}
        onChange={_handleChangeChain}
      >
        {CHAINS_ALLOWED.map((option: ChainExtended) => (
          <StyledMenuItem
            sx={{ color: "white" }}
            selected={chain?.name === option.name}
            key={option.id}
            value={option.id}
          >
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar src={option.logo.src} alt={option.logo.alt} />{" "}
              <Stack>
                <p>{option.name}</p>
              </Stack>
            </Stack>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </>
  );
}
