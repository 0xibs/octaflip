import { createDojoConfig, LOCAL_KATANA, LOCAL_TORII } from "@dojoengine/core";

import manifest from "../contract/manifest_dev.json";
import { RELEASE_RPC_URL, RELEASE_TORII_URL } from "./src/utils/constants";

export const dojoConfig = createDojoConfig({
  manifest,
  toriiUrl: LOCAL_TORII,
  rpcUrl: LOCAL_KATANA,
});
