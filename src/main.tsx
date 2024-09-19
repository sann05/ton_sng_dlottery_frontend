import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestURL =
  "https://sann05.github.io/ton_sng_dlottery_frontend/tonconnect-manifest.json";

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
  </TonConnectUIProvider>
);
