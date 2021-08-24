import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TODO error type is unknown, could give it specific type ?
      retry(failureCount, error: any) {
        if (error?.status === 404) return false;
        if (error?.status === 401) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  },
});

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { ReactQueryProvider };
