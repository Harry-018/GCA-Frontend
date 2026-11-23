import { useEffect, useRef } from "react";
import authStore from "../stores/authStore.js";
import { clearSessionQueries, getSessionIdentity } from "../lib/sessionCache.js";

/**
 * Clears the React Query cache when the authenticated session ends or changes.
 *
 * This lives in an effect so it runs after React has committed the logout
 * navigation and unmounted protected pages. Clearing synchronously inside a
 * logout click handler would let still-mounted observers refetch immediately
 * without a token and trigger the 401 session-expired modal.
 */
const SessionCacheGuard = () => {
  const token = authStore((state) => state.token);
  const user = authStore((state) => state.user);

  const identity = getSessionIdentity(token, user);
  const previousIdentity = useRef(identity);

  useEffect(() => {
    const previous = previousIdentity.current;
    previousIdentity.current = identity;

    if (identity === previous) return;

    // A fresh login (null -> identity) does not need a clear: the previous
    // logout already emptied the cache, and clearing here risks cancelling
    // the loaders that just started for the destination route.
    if (identity !== null && previous === null) return;

    // Logout / expiry (identity -> null) or a direct switch to another user.
    clearSessionQueries();
  }, [identity]);

  return null;
};

export default SessionCacheGuard;
