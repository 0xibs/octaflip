import { createDojoConfig, LOCAL_KATANA, LOCAL_TORII } from "@dojoengine/core";

import manifest from "../contract/manifest_dev.json";

export const dojoConfig = createDojoConfig({
  manifest,
  toriiUrl: LOCAL_TORII,
  rpcUrl: LOCAL_KATANA,
});
