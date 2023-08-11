import { Avatar, SelectChangeEvent, Stack } from "@mui/material";

import { CHAINS_ALLOWED } from "@/config/chain";
import { SetState } from "@/domain/utilityReactTypes";
import { Chain, ChainId } from "@/services/useink/types";

import { StyledMenuItem, StyledSelect } from "./styled";

export type ChainExtended = Chain & {
  logo: {
    src: string;
    alt: string;
  };
};

export const createChainObject = (chainList: ChainExtended[]) => {
  const imgPath = `/assets/chains/`;
  return chainList.reduce((acc, cv) => {
    cv.logo = {
      src: `${imgPath}${cv.id}.png`,
      alt: `${cv.name} img`,
    };
    return { ...acc, [cv.id]: cv };
  }, {}) as { [name: string]: ChainExtended };
};

export const ALL_CHAINS_OBJ: { [name: string]: ChainExtended } =
  createChainObject(CHAINS_ALLOWED as unknown as ChainExtended[]);

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
  const chain = ALL_CHAINS_OBJ[currentChain as string];
  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={chain.id}
        onChange={_handleChangeChain}
      >
        {Object.values(ALL_CHAINS_OBJ).map((option) => (
          <StyledMenuItem
            sx={{ color: "white" }}
            selected={chain.name === option.name}
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
