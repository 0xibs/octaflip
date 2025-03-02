import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

// Type definition for `octa_flip::models::Game` struct
export interface Game {
	id: BigNumberish;
	board_width: BigNumberish;
	board_height: BigNumberish;
	number_of_players: BigNumberish;
	data: BigNumberish;
	is_live: boolean;
}

// Type definition for `octa_flip::models::GameCounter` struct
export interface GameCounter {
	id: BigNumberish;
	current_val: BigNumberish;
}

// Type definition for `octa_flip::models::GameCounterValue` struct
export interface GameCounterValue {
	current_val: BigNumberish;
}

// Type definition for `octa_flip::models::GameValue` struct
export interface GameValue {
	board_width: BigNumberish;
	board_height: BigNumberish;
	number_of_players: BigNumberish;
	data: BigNumberish;
	is_live: boolean;
}

// Type definition for `octa_flip::models::PlayerAtPosition` struct
export interface PlayerAtPosition {
	game_id: BigNumberish;
	player: string;
	x: BigNumberish;
	y: BigNumberish;
}

// Type definition for `octa_flip::models::PlayerAtPositionValue` struct
export interface PlayerAtPositionValue {
	x: BigNumberish;
	y: BigNumberish;
}

// Type definition for `octa_flip::models::PlayerInGame` struct
export interface PlayerInGame {
	game_id: BigNumberish;
	player_id: BigNumberish;
	player_address: string;
}

// Type definition for `octa_flip::models::PlayerInGameValue` struct
export interface PlayerInGameValue {
	player_address: string;
}

// Type definition for `octa_flip::models::Tile` struct
export interface Tile {
	x: BigNumberish;
	y: BigNumberish;
	game_id: BigNumberish;
	claimed: string;
}

// Type definition for `octa_flip::models::TileValue` struct
export interface TileValue {
	claimed: string;
}

// Type definition for `octa_flip::systems::actions::actions::GameCreated` struct
export interface GameCreated {
	game_id: BigNumberish;
	board_width: BigNumberish;
	board_height: BigNumberish;
	number_of_players: BigNumberish;
}

// Type definition for `octa_flip::systems::actions::actions::GameCreatedValue` struct
export interface GameCreatedValue {
	board_width: BigNumberish;
	board_height: BigNumberish;
	number_of_players: BigNumberish;
}

// Type definition for `octa_flip::systems::actions::actions::GameEnded` struct
export interface GameEnded {
	game_id: BigNumberish;
	end_time: BigNumberish;
	winner: string;
}

// Type definition for `octa_flip::systems::actions::actions::GameEndedValue` struct
export interface GameEndedValue {
	end_time: BigNumberish;
	winner: string;
}

// Type definition for `octa_flip::systems::actions::actions::GameStarted` struct
export interface GameStarted {
	game_id: BigNumberish;
	start_time: BigNumberish;
}

// Type definition for `octa_flip::systems::actions::actions::GameStartedValue` struct
export interface GameStartedValue {
	start_time: BigNumberish;
}

// Type definition for `octa_flip::systems::actions::actions::PlayerJoined` struct
export interface PlayerJoined {
	game_id: BigNumberish;
	player_id: BigNumberish;
	player_address: string;
}

// Type definition for `octa_flip::systems::actions::actions::PlayerJoinedValue` struct
export interface PlayerJoinedValue {
	player_address: string;
}

// Type definition for `octa_flip::systems::actions::actions::TileClaim` struct
export interface TileClaim {
	game_id: BigNumberish;
	player: string;
	x: BigNumberish;
	y: BigNumberish;
}

// Type definition for `octa_flip::systems::actions::actions::TileClaimValue` struct
export interface TileClaimValue {
	player: string;
	x: BigNumberish;
	y: BigNumberish;
}

export interface SchemaType extends ISchemaType {
	octa_flip: {
		Game: Game,
		GameCounter: GameCounter,
		GameCounterValue: GameCounterValue,
		GameValue: GameValue,
		PlayerAtPosition: PlayerAtPosition,
		PlayerAtPositionValue: PlayerAtPositionValue,
		PlayerInGame: PlayerInGame,
		PlayerInGameValue: PlayerInGameValue,
		Tile: Tile,
		TileValue: TileValue,
		GameCreated: GameCreated,
		GameCreatedValue: GameCreatedValue,
		GameEnded: GameEnded,
		GameEndedValue: GameEndedValue,
		GameStarted: GameStarted,
		GameStartedValue: GameStartedValue,
		PlayerJoined: PlayerJoined,
		PlayerJoinedValue: PlayerJoinedValue,
		TileClaim: TileClaim,
		TileClaimValue: TileClaimValue,
	},
}
export const schema: SchemaType = {
	octa_flip: {
		Game: {
			id: 0,
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
			data: 0,
			is_live: false,
		},
		GameCounter: {
			id: 0,
			current_val: 0,
		},
		GameCounterValue: {
			current_val: 0,
		},
		GameValue: {
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
			data: 0,
			is_live: false,
		},
		PlayerAtPosition: {
			game_id: 0,
			player: "",
			x: 0,
			y: 0,
		},
		PlayerAtPositionValue: {
			x: 0,
			y: 0,
		},
		PlayerInGame: {
			game_id: 0,
			player_id: 0,
			player_address: "",
		},
		PlayerInGameValue: {
			player_address: "",
		},
		Tile: {
			x: 0,
			y: 0,
			game_id: 0,
			claimed: "",
		},
		TileValue: {
			claimed: "",
		},
		GameCreated: {
			game_id: 0,
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
		},
		GameCreatedValue: {
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
		},
		GameEnded: {
			game_id: 0,
			end_time: 0,
			winner: "",
		},
		GameEndedValue: {
			end_time: 0,
			winner: "",
		},
		GameStarted: {
			game_id: 0,
			start_time: 0,
		},
		GameStartedValue: {
			start_time: 0,
		},
		PlayerJoined: {
			game_id: 0,
			player_id: 0,
			player_address: "",
		},
		PlayerJoinedValue: {
			player_address: "",
		},
		TileClaim: {
			game_id: 0,
			player: "",
			x: 0,
			y: 0,
		},
		TileClaimValue: {
			player: "",
			x: 0,
			y: 0,
		},
	},
};
export enum ModelsMapping {
	Game = 'octa_flip-Game',
	GameCounter = 'octa_flip-GameCounter',
	GameCounterValue = 'octa_flip-GameCounterValue',
	GameValue = 'octa_flip-GameValue',
	PlayerAtPosition = 'octa_flip-PlayerAtPosition',
	PlayerAtPositionValue = 'octa_flip-PlayerAtPositionValue',
	PlayerInGame = 'octa_flip-PlayerInGame',
	PlayerInGameValue = 'octa_flip-PlayerInGameValue',
	Tile = 'octa_flip-Tile',
	TileValue = 'octa_flip-TileValue',
	GameCreated = 'octa_flip-GameCreated',
	GameCreatedValue = 'octa_flip-GameCreatedValue',
	GameEnded = 'octa_flip-GameEnded',
	GameEndedValue = 'octa_flip-GameEndedValue',
	GameStarted = 'octa_flip-GameStarted',
	GameStartedValue = 'octa_flip-GameStartedValue',
	PlayerJoined = 'octa_flip-PlayerJoined',
	PlayerJoinedValue = 'octa_flip-PlayerJoinedValue',
	TileClaim = 'octa_flip-TileClaim',
	TileClaimValue = 'octa_flip-TileClaimValue',
}