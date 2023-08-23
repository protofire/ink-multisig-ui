import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

import CreateNewAccount from "./CreateNewAccount";
import LoadNewAccount from "./LoadNewAccount";

export type SaveProps = Omit<SignatoriesAccount, "address">;

export { CreateNewAccount, LoadNewAccount };
