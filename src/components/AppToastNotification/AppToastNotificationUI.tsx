import { ToastContainer, ToastContainerProps } from "react-toastify";

export { toast } from "react-toastify";

type Props = Pick<ToastContainerProps, "autoClose" | "position">;

export function AppToastNotificationUI({
  autoClose = 5000,
  position = "top-right",
}: Props): JSX.Element {
  return (
    <ToastContainer theme="dark" autoClose={autoClose} position={position} />
  );
}
