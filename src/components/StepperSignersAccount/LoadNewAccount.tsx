import { LOAD_STEPS } from "./constants";
import CreateNewAccount, {
  StepperNewSignersAccountProps,
} from "./CreateNewAccount";

function LoadNewAccount(props: StepperNewSignersAccountProps) {
  return (
    <>
      <CreateNewAccount {...props} steps={LOAD_STEPS} />
    </>
  );
}

export default LoadNewAccount;
