import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import { constants } from 'starknet'
import {
    StarknetConfig,
    jsonRpcProvider,
    starkscan,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { SessionPolicies } from "@cartridge/controller";

// Define your contract addresses
const ETH_TOKEN_ADDRESS =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

// Define session policies
const policies: SessionPolicies = {
    contracts: {
        [ETH_TOKEN_ADDRESS]: {
            methods: [
                {
                    name: "approve",
                    entrypoint: "approve",
                    description: "Approve spending of tokens",
                },
                { name: "transfer", entrypoint: "transfer" },
            ],
        },
    },
}

// Initialize the connector
const connector = new ControllerConnector({
    policies,
    chains: [
        {
            rpcUrl:

                "https://api.cartridge.gg/x/starknet/sepolia",
        },
        {
            rpcUrl:

                "https://api.cartridge.gg/x/starknet/mainnet",
        },
    ],
    defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
    // url:
    //     process.env.NEXT_PUBLIC_KEYCHAIN_DEPLOYMENT_URL ??
    //     process.env.NEXT_PUBLIC_KEYCHAIN_FRAME_URL,
    // profileUrl:
    //     process.env.NEXT_PUBLIC_PROFILE_DEPLOYMENT_URL ??
    //     process.env.NEXT_PUBLIC_PROFILE_FRAME_URL,
    // slot: "profile-example",
    slot: "",
    preset: "octoflip",
    // namespace: "dopewars",
    // slot: "eternum-prod",
    // preset: "eternum",
    // namespace: "s0_eternum",
    // slot: "darkshuffle-mainnet",
    // preset: "dark-shuffle",
    // namespace: "darkshuffle_s0",
    tokens: {
        erc20: [
            "0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
        ],
    },
});

// Configure RPC provider
const provider = jsonRpcProvider({
    rpc: (chain: Chain) => {
        switch (chain) {
            case mainnet:
                return { nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' }
            case sepolia:
            default:
                return { nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia' }
        }
    },
})

export function StarknetProvider({ children }: { children: React.ReactNode }) {
    return (
        <StarknetConfig
            autoConnect
            chains={[mainnet, sepolia]}
            provider={provider}
            connectors={[connector]}
            explorer={starkscan}
        >
            {children}
        </StarknetConfig>
    )
}