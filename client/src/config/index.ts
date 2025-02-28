import { LOCAL_KATANA, LOCAL_TORII } from "@dojoengine/core";
import { SessionPolicies } from "@cartridge/controller";
import { ENV_OPTIONS } from "../utils/constants";

const ENV: ENV_OPTIONS = import.meta.env.VITE_ENVIRONMENT;
const TORII_SEPOLIA_URL = import.meta.env.VITE_TORII_SEPOLIA_URL;
const TORII_MAINNET_URL = import.meta.env.VITE_TORII_MAINNET_URL;
const RPC_SEPOLIA_URL = import.meta.env.VITE_RPC_SEPOLIA_URL;
const RPC_MAINNET_URL = import.meta.env.VITE_RPC_MAINNET_URL;
const OCTAFLIP_SEPOLIA_WORLD_ADDRESS = import.meta.env
  .VITE_OCTAFLIP_SEPOLIA_WORLD_ADDRESS;
const OCTAFLIP_MAINNET_WORLD_ADDRESS = import.meta.env
  .VITE_OCTAFLIP_MAINNET_WORLD_ADDRESS;
const OCTAFLIP_SEPOLIA_POLICIES_ADDRESS = import.meta.env
  .VITE_OCTAFLIP_SEPOLIA_POLICIES_ADDRESS;
const OCTAFLIP_MAINNET_POLICIES_ADDRESS = import.meta.env
  .VITE_OCTAFLIP_MAINNET_POLICIES_ADDRESS;

// Decide TORII URL. Defaults to LOCAL_TORII
const TORII_URL =
  ENV == ENV_OPTIONS.MAINNET
    ? TORII_MAINNET_URL
    : ENV == ENV_OPTIONS.SEPOLIA
    ? TORII_SEPOLIA_URL
    : LOCAL_TORII;

// Decide RPC URL. Defaults to LOCAL_KATANA
const RPC_URL =
  ENV == ENV_OPTIONS.MAINNET
    ? RPC_MAINNET_URL
    : ENV == ENV_OPTIONS.SEPOLIA
    ? RPC_SEPOLIA_URL
    : LOCAL_KATANA;

const OCTAFLIP_WORLD_ADDRESS =
  ENV == ENV_OPTIONS.MAINNET
    ? OCTAFLIP_MAINNET_WORLD_ADDRESS
    : ENV == ENV_OPTIONS.SEPOLIA
    ? OCTAFLIP_SEPOLIA_WORLD_ADDRESS
    : null;

const OCTAFLIP_POLICIES_ADDRESS =
  ENV == ENV_OPTIONS.MAINNET
    ? OCTAFLIP_MAINNET_POLICIES_ADDRESS
    : ENV == ENV_OPTIONS.SEPOLIA
    ? OCTAFLIP_SEPOLIA_POLICIES_ADDRESS
    : null;

const POLICIES: SessionPolicies = {
  contracts: {
    [OCTAFLIP_POLICIES_ADDRESS]: {
      methods: [
        {
          name: "create_game",
          entrypoint: "create_game",
          description: "Create a new game",
        },
        {
          name: "join_game",
          entrypoint: "join_game",
          description: "Join existing game",
        },
        {
          name: "start_game",
          entrypoint: "start_game",
          description: "Start game play",
        },
        {
          name: "claim_tile",
          entrypoint: "claim_tile",
          description: "Claim tile",
        },
        {
          name: "game_winner",
          entrypoint: "game_winner",
          description: "Decide game winner",
        },
      ],
    },
  },
};

export const CONFIG = {
  ENV,
  GRAPHQL_ENDPOINT: `${TORII_URL}/graphql`,
  TORII_URL,
  RPC_URL, // Recommended. Decides which RPC URL based on environment
  RPC_MAINNET_URL,
  RPC_SEPOLIA_URL,
  POLICIES,
};
