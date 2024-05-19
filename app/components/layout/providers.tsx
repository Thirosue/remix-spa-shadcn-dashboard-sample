import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "~/components/ui/toaster";
import SessionProvider from "./session-provider";
import ConfirmProvider from "./confirm-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ConfirmProvider>
          <Toaster />
          {children}
        </ConfirmProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
