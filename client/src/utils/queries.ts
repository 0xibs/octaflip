import { gql } from "@apollo/client";
import { QUERY_LIMIT } from "./constants";

export const QueryAllGames = gql`
  query {
    octaFlipGameModels(limit: 1000000) {
      edges {
        node {
          id
          board_width
          board_height
          data
          number_of_players
          is_live
        }
      }
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query octaFlipGameModels($gameId: u64) {
    octaFlipGameModels(where: { id: $gameId }) {
      edges {
        node {
          id
          number_of_players
          is_live
        }
      }
    }
  }
`;

export const QUERY_PLAYERS_IN_GAME = gql`
  query octaFlipPlayerInGameModels($gameId: u64) {
    octaFlipPlayerInGameModels(where: { game_id: $gameId }) {
      edges {
        node {
          game_id
          player_id
          player_address
        }
      }
    }
  }
`;
