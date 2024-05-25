import { useAtom } from "jotai";
import * as loadingAtoms from "../atoms/loading";

export default function useLoading() {
  const [isLoading, setIsLoading] = useAtom(loadingAtoms.isLoading);

  const showLoading = () => setIsLoading(true);
  const closeLoading = () => setIsLoading(false);

  return {
    isLoading,
    showLoading,
    closeLoading,
  }
}