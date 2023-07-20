import { useRouter } from "next/router";
import { useEffect } from "react";

type RedirectComparisonOptions = {
  redirectUrls: string[];
  onMatch: (match: string) => void;
  onNoMatch?: (redirectUrls: string[]) => void;
};

const useRedirectComparison = ({
  redirectUrls,
  onMatch,
  onNoMatch,
}: RedirectComparisonOptions): void => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.redirect) return;

    const redirectPath = router.query.redirect;
    const matchedRedirect = redirectUrls.find((url) => {
      return url === redirectPath;
    });

    if (matchedRedirect) {
      onMatch(matchedRedirect);
    } else if (onNoMatch) {
      onNoMatch(redirectUrls);
    }
  }, [redirectUrls, onMatch, onNoMatch, router.query.redirect]);
};

export default useRedirectComparison;
