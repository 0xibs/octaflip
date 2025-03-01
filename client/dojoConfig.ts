import { createDojoConfig } from "@dojoengine/core";

import manifestDev from "../contract/manifest_dev.json";
import manifestSepolia from "../contract/manifest_sepolia.json";
import manifestRelease from "../contract/manifest_release.json";
import { CONFIG } from "./src/config";
import { ENV_OPTIONS } from "./src/utils/constants";

export const dojoConfig = createDojoConfig({
  manifest:
    CONFIG.ENV == ENV_OPTIONS.MAINNET
      ? ""
      : CONFIG.ENV == ENV_OPTIONS.SEPOLIA
      ? manifestSepolia
      : CONFIG.ENV == ENV_OPTIONS.RELEASE
      ? manifestRelease
      : manifestDev,
  toriiUrl: CONFIG.TORII_URL,
  rpcUrl: CONFIG.RPC_URL,
});
