import router from "next/router";
import { useCallback } from "react";

interface UrlParameter {
  name: string;
  value: string;
}

interface UseReplaceUrlParam {
  replaceUrlParam: ({ name, value }: UrlParameter) => void;
}

export function useReplaceURLParam(): UseReplaceUrlParam {
  const replaceUrlParam = useCallback(({ name, value }: UrlParameter) => {
    const newQueryParams = { ...router.query };

    // Assigns the parameter value based on the provided parameter name
    newQueryParams[name] = value;

    router.replace(
      {
        pathname: router.pathname,
        query: newQueryParams,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return { replaceUrlParam };
}
