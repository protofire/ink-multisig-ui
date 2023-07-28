import { useRouter } from "next/router";
import { useEffect } from "react";

type RedirectComparisonOptions = {
  redirectUrls: string[];
  onMatch: (match: string) => void;
  onNoMatch?: (redirectUrls: string[]) => void;
};

/**
 * Hook that compares a redirect URL from the router's query parameters with a list of valid redirect URLs.
 * If a match is found, it calls the `onMatch` callback with the matched URL.
 * If no match is found and the `onNoMatch` callback is provided.
 *
 * @param {Object} options - The options for the hook.
 * @param {string[]} options.redirectUrls - The list of valid redirect URLs.
 * @param {Function} options.onMatch - Receives the matched URL as a parameter.
 * @param {Function} [options.onNoMatch] - Optional. Receives the list of valid redirect URLs as a parameter.
 *
 * @example
 * useRedirectComparison({
 *   redirectUrls: ['/valid1', '/valid2'],
 *   onMatch: (match) => console.log(`Matched: ${match}`),
 *   onNoMatch: (redirectUrls) => console.log(`No match found. Valid URLs are: ${redirectUrls.join(', ')}`),
 * });
 */
export const useRedirectComparison = ({
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
