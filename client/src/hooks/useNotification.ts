import { useAtom } from "jotai";
import * as notificationAtoms from "../atoms/notification";

export default function useNotification() {
  const [isShow, setIsShow] = useAtom(notificationAtoms.isShow);
  const [message, setMessage] = useAtom(notificationAtoms.message);

  const showNotification = (message: string) => {
    setMessage(message);
    setIsShow(true);
  }

  const closeNotification = () => setIsShow(false);

  return {
    isShow,
    message,
    showNotification,
    closeNotification,
  }
}