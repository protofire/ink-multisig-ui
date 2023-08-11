// Copyright 2017-2023 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Source:
// https://github.com/polkadot-js/ui/blob/master/packages/react-identicon/src/Identicon.tsx

import { Empty, Jdenticon } from "@polkadot/react-identicon";
import {
  IdentityProps as Props,
  Props as ComponentProps,
} from "@polkadot/react-identicon/types";
import { ICON_DEFAULT_HOST, settings } from "@polkadot/ui-settings";
import { isHex, isU8a, u8aToHex } from "@polkadot/util";
import {
  decodeAddress,
  encodeAddress,
  ethereumEncode,
} from "@polkadot/util-crypto";
import type { Prefix } from "@polkadot/util-crypto/address/types";
import React from "react";

import { StyledBox } from "./styled";

const Fallback = Jdenticon;

interface State {
  address: string;
  publicKey: string;
}

const DEFAULT_SIZE = 64;
const Components: Record<string, React.ComponentType<ComponentProps>> = {
  empty: Empty,
  jdenticon: Jdenticon,
  substrate: Jdenticon,
};

class BaseIcon extends React.PureComponent<Props, State> {
  public override state: State = {
    address: "",
    publicKey: "0x",
  };

  private static prefix?: Prefix = undefined;

  public static setDefaultPrefix(prefix: Prefix): void {
    BaseIcon.prefix = prefix;
  }

  public static getDerivedStateFromProps(
    { prefix = BaseIcon.prefix, theme, value }: Props,
    prevState: State
  ): State | null {
    if (theme === "ethereum") {
      const address = isU8a(value) ? ethereumEncode(value) : value || "";

      return { address, publicKey: "" };
    }

    try {
      const address =
        isU8a(value) || isHex(value)
          ? encodeAddress(value, prefix)
          : value || "";
      const publicKey = u8aToHex(decodeAddress(address, false, prefix));

      return address === prevState.address
        ? null
        : {
            address,
            publicKey,
          };
    } catch {
      return {
        address: "",
        publicKey: "0x",
      };
    }
  }

  public override render(): React.ReactNode {
    const wrapped = this.getWrapped(this.state, this.props);
    return wrapped;
  }

  private getWrapped(
    { address, publicKey }: State,
    { Custom }: Props
  ): React.ReactNode {
    const {
      className = "",
      isAlternative,
      isHighlight,
      size = DEFAULT_SIZE,
      style = {},
      theme = settings.icon,
    } = this.props;
    const Component = !address
      ? Empty
      : Custom ||
        Components[theme === "default" ? ICON_DEFAULT_HOST : theme] ||
        Fallback;

    return (
      <StyledBox
        className={`ui--IdentityIcon  ${className}`}
        key={address}
        style={style}
      >
        <Component
          address={address}
          className={isHighlight ? "highlight" : ""}
          isAlternative={isAlternative}
          publicKey={publicKey}
          size={size}
        />
      </StyledBox>
    );
  }
}

function Icon(props: Props): React.ReactElement<Props> {
  return <BaseIcon {...props} />;
}

export const Identicon = React.memo(Icon);
