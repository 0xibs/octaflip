import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";

// Dojo related imports
import { init, SchemaType } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
// import { SchemaType, schema } from "./typescript/models.gen.ts";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import { dojoConfig } from "../dojoConfig.ts";
import { StarknetProvider } from "./starknet-provider.tsx";
import { setupWorld } from "./dojo/typescript/contracts.gen.ts";
import { schema } from "./dojo/typescript/models.gen.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import NewGame from "./pages/NewGame.tsx";
import JoinGame from "./pages/JoinGame.tsx";
import Board from "./components/Board";
import apollo_client from "./apollo-client";

/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * @throws {Error} If initialization fails
 */
async function main() {
  const sdk = await init<SchemaType>(
    {
      client: {
        rpcUrl: dojoConfig.rpcUrl,
        toriiUrl: dojoConfig.toriiUrl,
        relayUrl: dojoConfig.relayUrl,
        worldAddress: dojoConfig.manifest.world.address,
      },
      domain: {
        name: "Octaflip",
        version: "1",
        chainId: "KATANA",
        revision: "1",
      },
    },
    schema
  );

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ApolloProvider client={apollo_client}>
        <DojoSdkProvider
          sdk={sdk}
          dojoConfig={dojoConfig}
          clientFn={setupWorld}
        >
          <StarknetProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="new" element={<NewGame />} />
                <Route path="join" element={<JoinGame />} />
                <Route path="play/:gameId" element={<Board />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </StarknetProvider>
        </DojoSdkProvider>
      </ApolloProvider>
    </StrictMode>
  );
}

main().catch((error) => {
  console.error("Failed to initialize the application:", error);
});
