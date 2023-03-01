/* ---------- Providers ---------- */
import { ClippyProvider } from "./clippy";

export const AppProvider = ({ children }: React.PropsWithChildren) => (
  <ClippyProvider>{children}</ClippyProvider>
);
