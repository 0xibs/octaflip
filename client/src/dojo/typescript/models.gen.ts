import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

type WithFieldOrder<T> = T & { fieldOrder: string[] };

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
		Game: WithFieldOrder<Game>,
		GameCounter: WithFieldOrder<GameCounter>,
		GameCounterValue: WithFieldOrder<GameCounterValue>,
		GameValue: WithFieldOrder<GameValue>,
		PlayerAtPosition: WithFieldOrder<PlayerAtPosition>,
		PlayerAtPositionValue: WithFieldOrder<PlayerAtPositionValue>,
		PlayerInGame: WithFieldOrder<PlayerInGame>,
		PlayerInGameValue: WithFieldOrder<PlayerInGameValue>,
		Tile: WithFieldOrder<Tile>,
		TileValue: WithFieldOrder<TileValue>,
		GameCreated: WithFieldOrder<GameCreated>,
		GameCreatedValue: WithFieldOrder<GameCreatedValue>,
		GameEnded: WithFieldOrder<GameEnded>,
		GameEndedValue: WithFieldOrder<GameEndedValue>,
		GameStarted: WithFieldOrder<GameStarted>,
		GameStartedValue: WithFieldOrder<GameStartedValue>,
		PlayerJoined: WithFieldOrder<PlayerJoined>,
		PlayerJoinedValue: WithFieldOrder<PlayerJoinedValue>,
		TileClaim: WithFieldOrder<TileClaim>,
		TileClaimValue: WithFieldOrder<TileClaimValue>,
	},
}
export const schema: SchemaType = {
	octa_flip: {
		Game: {
			fieldOrder: ['id', 'board_width', 'board_height', 'number_of_players', 'data', 'is_live'],
			id: 0,
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
			data: 0,
			is_live: false,
		},
		GameCounter: {
			fieldOrder: ['id', 'current_val'],
			id: 0,
			current_val: 0,
		},
		GameCounterValue: {
			fieldOrder: ['current_val'],
			current_val: 0,
		},
		GameValue: {
			fieldOrder: ['board_width', 'board_height', 'number_of_players', 'data', 'is_live'],
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
			data: 0,
			is_live: false,
		},
		PlayerAtPosition: {
			fieldOrder: ['game_id', 'player', 'x', 'y'],
			game_id: 0,
			player: "",
			x: 0,
			y: 0,
		},
		PlayerAtPositionValue: {
			fieldOrder: ['x', 'y'],
			x: 0,
			y: 0,
		},
		PlayerInGame: {
			fieldOrder: ['game_id', 'player_id', 'player_address'],
			game_id: 0,
			player_id: 0,
			player_address: "",
		},
		PlayerInGameValue: {
			fieldOrder: ['player_address'],
			player_address: "",
		},
		Tile: {
			fieldOrder: ['x', 'y', 'game_id', 'claimed'],
			x: 0,
			y: 0,
			game_id: 0,
			claimed: "",
		},
		TileValue: {
			fieldOrder: ['claimed'],
			claimed: "",
		},
		GameCreated: {
			fieldOrder: ['game_id', 'board_width', 'board_height', 'number_of_players'],
			game_id: 0,
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
		},
		GameCreatedValue: {
			fieldOrder: ['board_width', 'board_height', 'number_of_players'],
			board_width: 0,
			board_height: 0,
			number_of_players: 0,
		},
		GameEnded: {
			fieldOrder: ['game_id', 'end_time', 'winner'],
			game_id: 0,
			end_time: 0,
			winner: "",
		},
		GameEndedValue: {
			fieldOrder: ['end_time', 'winner'],
			end_time: 0,
			winner: "",
		},
		GameStarted: {
			fieldOrder: ['game_id', 'start_time'],
			game_id: 0,
			start_time: 0,
		},
		GameStartedValue: {
			fieldOrder: ['start_time'],
			start_time: 0,
		},
		PlayerJoined: {
			fieldOrder: ['game_id', 'player_id', 'player_address'],
			game_id: 0,
			player_id: 0,
			player_address: "",
		},
		PlayerJoinedValue: {
			fieldOrder: ['player_address'],
			player_address: "",
		},
		TileClaim: {
			fieldOrder: ['game_id', 'player', 'x', 'y'],
			game_id: 0,
			player: "",
			x: 0,
			y: 0,
		},
		TileClaimValue: {
			fieldOrder: ['player', 'x', 'y'],
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