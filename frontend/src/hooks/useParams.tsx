import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return {
    newQueryString(pathname: string, name: string, value: string) {
      router.push(pathname + "?" + createQueryString(name, value));
    },
  };
};

export default useParams;
