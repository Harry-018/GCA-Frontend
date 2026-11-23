import { QueryClient } from "@tanstack/react-query";

export const QUERY_STALE_TIME = {
  staticContent: 5 * 60 * 1000,
  referenceData: 5 * 60 * 1000,
  tableData: 30 * 1000,
  liveData: 10 * 1000,
};

const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

const shouldRetryQuery = (failureCount, error) => {
  if (error?.isSessionExpired) return false;

  const status = error?.response?.status;

  if (status && !RETRYABLE_STATUSES.has(status)) return false;

  return failureCount < 2;
};

// Module-level so React Router loaders and components share one cache.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME.tableData,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: shouldRetryQuery,
    },
    mutations: {
      retry: false,
    },
  },
});
