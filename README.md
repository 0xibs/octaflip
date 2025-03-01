# Octaflip
Play at: https://www.octaflip.com
## Demo Video
### [Watch this demo on YouTube](https://youtu.be/fZs9TmIBW60)
- [![Watch the video](https://img.youtube.com/vi/fZs9TmIBW60/maxresdefault.jpg)](https://youtu.be/fZs9TmIBW60)

- ## Verified Proofs
- Celenium (https://mocha-4.celenium.io/namespace/0000000000000000000000000000000000007361796170726f6f6673?tab=Blobs)
  ![image](https://github.com/user-attachments/assets/361ddc97-e7c3-4acb-9579-febcf242788f)
  
- Swiftness
  ![image](https://github.com/user-attachments/assets/aaba5cae-3829-400d-b71f-178b241b9e56)
  
- Herodotus
  ![image](https://github.com/user-attachments/assets/e4f3f525-9d84-4b4f-95a5-6678e9bb0c74)
  ![image](https://github.com/user-attachments/assets/7e2a44e1-002f-4387-8630-fd2cd3bf4249)


## Description

Octaflip is a fully on-chain Player vs. Player game built using Dojo toolchain for provable applications.
Players battle for tiles on an 8x8 grid, with the player claiming the most tiles at the
end of the game winning. Leveraging Dojo's Entity Component System (ECS), Katana Sequencer, Saya Prover,
Herodotus, and Celestia Data Availability(Celestia for data availability ensures that game data is publicly
accessible and verifiable, even if other parts of the system are compromised), Octaflip ensures game state
can be forked, is provable and verifiable, offering unparalleled transparency and trust.

## Technologies Used

* **Starknet:**  A permissionless decentralized Validity-Rollup (ZK-Rollup) operating as a Layer-2 network on Ethereum, providing the scalability and security necessary for complex on-chain game logic.
* **Cairo:** A provable programming language used to write the core game logic for Octaflip, ensuring transparency and security through verifiable computations.
* **Dojo:** A provable game engine that facilitates the development of autonomous worlds on Starknet, using ECS to define game logic and manage state transitions in Octaflip.
* **Sozo:**  Essential for managing the lifecycle of Octaflip's Dojo contracts, Sozo provides the tools necessary for building, migrating, and deploying the game's core logic.
* **Celestia:** Providing decentralized data availability for Octaflip, Celestia stores Saya-proven blobs, guaranteeing that Octaflip's game history is accessible and verifiable.
* **Catridge Controller:** Providing seamless player onboarding with self-custodial embedded wallets with Passkeys, Session Tokens, Paymaster and more on Octaflip.
* **Herodotus:** Provides APIs for leveraging managed ZK infrastructure, verifiable data, and coprocessing across blockchain networks.
* **Saya:** Generates cryptographic proofs for blocks produced by Katana, Dojo Sequencer, and posts the blobs to Celestia, ensuring the integrity and verifiability of game state transitions.
* **Torii:** An indexing service that provides near real-time event streaming for Octaflip's on-chain state changes, facilitating the development of responsive client applications.
* **Slot:** Toolchain developed by Cartrige for rapidly spinning up Katana and Torii instances for play testing and supporting games in production.
* **React:** Used for developing Octaflip's frontend, providing a fluid and interactive experience for players.
* **Apollo Client:** Facilitates real-time game state updates in Octaflip by handling GraphQL subscriptions and queries, ensuring a dynamic user experience.
* **Vite:** A build tool that provides a fast and optimized development experience for Octaflip's frontend, with native ESM support and hot module reloading.
* **Tailwind CSS:** For styling the frontend.
* **Swiftness:** [Cairo VM Verifier](https://demo.swiftness.iosis.tech/)

**Partner Technologies:**

* **Dojo:** A provable game engine that facilitates the development of autonomous worlds on Starknet, using ECS to define game logic and manage state transitions in Octaflip.
* **Celestia:** Providing decentralized data availability for Octaflip, Celestia stores Saya-proven blobs, guaranteeing that Octaflip's game history is accessible and verifiable.
* **Catridge Controller:** Providing seamless player onboarding with self-custodial embedded wallets with Passkeys, Session Tokens, Paymaster and more on Octaflip.
* **Herodotus:** Provides APIs for leveraging managed ZK infrastructure, verifiable data, and coprocessing across blockchain networks.
* **Saya:** Generates cryptographic proofs for blocks produced by Katana, Dojo Sequencer, and posts the blobs to Celestia, ensuring the integrity and verifiability of game state transitions.

## Project Structure
```
checkmate/
├── contracts/
│   ├── Scarb.toml
│   ├── manifest_release.json
│   ├── .github/
│   │   └── workflows/
│   │       ├── test.yaml
│   │       └── release.yml
│   ├── Scarb.lock
│   ├── manifest_dev.json
│   ├── dojo_release.toml
│   ├── dojo_dev.toml
│   ├── assets/
│   │   ├── icon.png
│   │   └── cover.png
│   ├── target/
│   │   └── ... (compiled contracts)
│   ├── .vscode/
│   │   └── settings.json
│   ├── LICENSE
│   ├── dojo_sepolia.toml
│   ├── torii_sepolia.toml
│   ├── src/
│   │   ├── utils.cairo
│   │   ├── models.cairo
│   │   ├── constants.cairo
│   │   ├── tests/
│   │   │   └── test_world.cairo
│   │   ├── lib.cairo
│   │   └── systems/
│   │       └── actions.cairo
│   ├── .gitignore
│   └── manifest_sepolia.json
├── client/
│   ├── tsconfig.node.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.ts
│   ├── README.md
│   ├── package.json
│   ├── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── NewGame.tsx
│   │   │   ├── PlayGame.tsx
│   │   │   └── JoinGame.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Board.tsx
│   │   │   ├── ConnectWallet.tsx
│   │   │   ├── Tile.tsx
│   │   │   └── Countdown.tsx
│   │   ├── assets/
│   │   │   └── images/
│   │   │       ├── user.png
│   │   │       └── flip.png
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── main.tsx
│   │   ├── hooks/
│   │   │   └── useCountdown.ts
│   │   ├── starknet-provider.tsx
│   │   ├── index.css
│   │   ├── dojo/
│   │   │   └── typescript/
│   │   │       ├── models.gen.ts
│   │   │       └── contracts.gen.ts
│   │   ├── apollo-client.ts
│   │   ├── App.css
│   │   ├── useSystemCalls.ts
│   │   ├── App.tsx
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── queries.ts
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── .gitignore
│   ├── dojoConfig.ts
│   ├── tsconfig.app.json
│   └── public/
│       └── vite.svg
└── README.md
```

## Setup and Installation

1.  **Dojo Setup:**
    * Follow the Dojo getting started guide: [Dojo Installation](https://www.dojoengine.org/getting-started)
    * Ensure Sozo, Katana, and Torii are correctly set up.
2.  **Saya Setup:**
    * Follow the Saya setup instructions: [Saya](https://github.com/dojoengine/saya)
    * Setup Saya in sovereign mode.
3.  **Herodotus Setup:**
    * Obtain a Herodotus API key from: herodotus.dev
4.  **Celestia Setup:**
    * Follow the Celestia quick start guide: [Celestia Quick Start](https://docs.celestia.org/how-to-guides/quick-start)
    * Run a Celestia light node locally.
    * Obtain your Celestia auth token and RPC URL.
5.  **Client Setup:**
    * Navigate to the `client` directory.
    * Run `pnpm install` to install dependencies.
    * Run `pnpm run dev` to start the frontend.
6.  **Environment Variables:**
    * Set up necessary environment variables, including Herodotus API key, Celestia auth token, and RPC URL.

## Local Setup

Contracts Directory -> `cd contract/`

Terminal 1
```sh
# Start a local Starknet development sequencer
katana --dev --dev.no-fee
```

Terminal 2
```sh
# Build Octaflip contract
sozo build

# Inspect the world, a preview of your World's state and contract addresses.
sozo inspect

# Deploy the artifact to Katana.
sozo migrate

# ⛩️  Migration successful with world at address <WORLD ADDRESS>
```

Terminal 3
```sh
# Torii automatically organizes your data into tables,
# making it easy for you to perform queries using GraphQLor GRPC.
torii --world <WORLD ADDRESS> --http.cors_origins "*"
```

Client Directory -> `cd client`

Terminal 1
```sh
# Install dependencies
pnpm install

# Start the frontend
pnpm run dev
```

Running Saya in Sovereign mode locally
```sh
# Clone Saya
git clone https://github.com/dojoengine/saya.git

# Navigate to the cloned directory
cd saya

# Build and run Saya in Sovereign mode locally
cargo run --bin saya -r -- sovereign start --starknet-rpc $STARKNET_RPC --snos-program $SNOS_PROGRAM --atlantic-key $ATLANTIC_KEY --celestia-rpc $CELESTIA_RPC --celestia-token $CELESTIA_TOKEN --genesis.first-block-number 0 local
```

Saya generates cryptographic proofs for game blocks. These proofs are then published as data blobs to Celestia,
allowing you to verify game outcomes directly on the Celestia Explorer. You can also, download the
JSON proof file from Herodotus and use Swiftness to independently verify the proof.

## Usage

1.  Go to `octaflip.com`.
2.  Create a Catridge Controller Session.
3.  Create a new game or join an existing game using the game ID.
4.  The game starts when two players join.
5.  Players claim as much tiles as possible before the time runs out.
6.  The player with the most tiles claimed at the end of the game wins.

## Key Features

* **Fully On-Chain:** All game logic and state are stored on the Starknet blockchain.
* **Provable and Verifiable:** Every game state is provable and verifiable, ensuring transparency.
* **Gasless Transactions:** Leveraging Catridge Controller, the game offers a gasless experience.
* **Real-Time Updates:** Torii provides near real-time updates of game state changes.
* **Data Availability:** Celestia ensures game data availability.

## Special Instructions/Requirements

* Herodotus API key is required.
* Saya must be running in sovereign mode for proving and posting blobs to Celestia.
* Celestia light node must be running locally.
* Celestia auth token and RPC URL are required.

## How Partner Technologies Were Used

* **Dojo:** Octaflip's entire game world is built upon Dojo's Entity Component System (ECS) architecture. This enables a fully on-chain, provable gaming experience. Cairo-written models and actions define the game's logic, while Dojo efficiently manages the dynamic world state, ensuring every move and outcome is verifiable.
* **Celestia:** To guarantee data availability and transparency, Octaflip leverages Celestia. Saya generates cryptographic proofs of game state changes, and these proofs are then securely published as blobs to Celestia. This ensures that the game's history is permanently accessible and auditable by anyone.
* **Catridge:** Providing seamless player onboarding with self-custodial embedded wallets with Passkeys, Session Tokens, Paymaster and more.
* **Herodotus:** Herodotus APIs are used to facilitate verifiable cross-chain data and coprocessing, enhancing the game's security and transparency.
* **Slot:** Slot automates and simplifies the deployment and management of Octaflip's Dojo infrastructure. This allows the development team to focus on game development, and less on infrastructure concerns.

## Future Improvements

* Mainnet deployment.
* Enhanced
