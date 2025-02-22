import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_actions_claimTile_calldata = (gameId: BigNumberish, x: BigNumberish, y: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "claim_tile",
			calldata: [gameId, x, y],
		};
	};

	const actions_claimTile = async (snAccount: Account | AccountInterface, gameId: BigNumberish, x: BigNumberish, y: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_claimTile_calldata(gameId, x, y),
				"octa_flip",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_createGame_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "create_game",
			calldata: [],
		};
	};

	const actions_createGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_createGame_calldata(),
				"octa_flip",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_gameWinner_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "game_winner",
			calldata: [gameId],
		};
	};

	const actions_gameWinner = async (gameId: BigNumberish) => {
		try {
			return await provider.call("octa_flip", build_actions_gameWinner_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_joinGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "join_game",
			calldata: [gameId],
		};
	};

	const actions_joinGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_joinGame_calldata(gameId),
				"octa_flip",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_startGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "start_game",
			calldata: [gameId],
		};
	};

	const actions_startGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_startGame_calldata(gameId),
				"octa_flip",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			claimTile: actions_claimTile,
			buildClaimTileCalldata: build_actions_claimTile_calldata,
			createGame: actions_createGame,
			buildCreateGameCalldata: build_actions_createGame_calldata,
			gameWinner: actions_gameWinner,
			buildGameWinnerCalldata: build_actions_gameWinner_calldata,
			joinGame: actions_joinGame,
			buildJoinGameCalldata: build_actions_joinGame_calldata,
			startGame: actions_startGame,
			buildStartGameCalldata: build_actions_startGame_calldata,
		},
	};
}