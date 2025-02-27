import { useState } from "react";
import player_avatar from "./../assets/images/user.png";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import Header from "./Header";
import {
  QUERY_PLAYERS_IN_GAME,
  QUERY_PLAYER_AT_POSITION,
  QUERY_SINGLE_GAME,
  QUERY_TILES_OF_GAME,
} from "../utils/queries";
import { useAccount } from "@starknet-react/core";
import { toast } from "react-toastify";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEvents } from "@dojoengine/utils";
import { extractErrorMessageFromJSONRPCError } from "../utils/helpers";
import { CountdownTimer } from "./Countdown";
import Tile from "./Tile";
import { GRID_SIZE } from "../utils/constants";

const Board = () => {
  const { gameId } = useParams();

  const { account } = useAccount();
  const { client } = useDojoSDK();
  const [play, setPlay] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(0);
  const [my_flip_count, setMyFlipCount] = useState<number>(0);
  const [opponent_flip_count] = useState<number>(14);
  const [my_tiles, setMyTiles] = useState<number[]>([]);
  const [opponent_tiles, setOpponentTiles] = useState<number[]>([
    1, 5, 4, 19, 23, 40, 30, 10, 22, 63, 62, 60, 56, 57,
  ]);

  const {
    data: querySingleGameData,
    startPolling: startPollingSingleGameData,
  } = useQuery(QUERY_SINGLE_GAME, {
    variables: { gameId },
  });

  const {
    data: queryPlayersInGameData,
    startPolling: startPollingPlayersInGame,
  } = useQuery(QUERY_PLAYERS_IN_GAME, {
    variables: { gameId },
  });

  const { data: queryTilesOfGameData, startPolling: startPollingTilesOfGame } =
    useQuery(QUERY_TILES_OF_GAME, {
      variables: { gameId },
    });

  const {
    data: queryPlayerAtPositionData,
    startPolling: startPollingPlayerAtPosition,
  } = useQuery(QUERY_PLAYER_AT_POSITION, {
    variables: { gameId },
  });

  const xCoord = Array.from({ length: GRID_SIZE }, (_, i) => Number(i + 1));
  const yCoord = Array.from({ length: GRID_SIZE }, (_, i) => Number(i + 1));

  const game = querySingleGameData?.octaFlipGameModels?.edges[0]?.node;
  const gameIsOngoing = game?.is_live;
  const playersInGame =
    queryPlayersInGameData?.octaFlipPlayerInGameModels?.edges;
  const waiting = playersInGame?.length < 2 ? true : false;
  const tilesOfGame = queryTilesOfGameData?.octaFlipTileModels?.edges;

  const startTime = Math.floor(Date.now() / 1000); // Current UTC time in seconds
  const duration = 3600; // 1-minute countdown

  async function startGame() {
    if (!account) {
      toast.error("Account not connected");
      return;
    }

    if (!gameId) {
      toast.error("Invalid or empty game Id");
      return;
    }

    try {
      const { transaction_hash } = await client.actions.startGame(
        account,
        gameId
      );

      getEvents(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      const tx = await account.getTransactionReceipt(transaction_hash);

      if (!tx.isSuccess()) {
        toast.error("Failed to join");
        throw new Error("Failed to join game");
      }
    } catch (e: any) {
      const errorMessage = extractErrorMessageFromJSONRPCError(
        JSON.stringify(e)
      );
      toast.error(errorMessage);
      console.error(e);
    }
  }

  async function claimTile(x: string, y: string) {
    if (!account) {
      toast.error("Account not connected");
      return;
    }

    if (!gameId) {
      toast.error("Invalid or empty game Id");
      return;
    }

    try {
      const claim = await client.actions.claimTile(account, gameId, x, y);

      const transaction_hash = claim.transaction_hash;
      getEvents(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      const tx = await account.getTransactionReceipt(transaction_hash);
      if (!tx.isSuccess()) {
        toast.error("Failed to claim tile");
        throw new Error("Failed to claim tile");
      }
    } catch (e: any) {
      const errorMessage = extractErrorMessageFromJSONRPCError(
        JSON.stringify(e)
      );
      toast.error(errorMessage);
    }
  }

  startPollingPlayersInGame(100);
  startPollingSingleGameData(100);
  startPollingPlayerAtPosition(100);
  startPollingTilesOfGame(100);
  return (
    <>
      <Header />
      <div className="bg-stone-900 flex justify-center pt-[150px] w-full min-h-screen h-full">
        <div
          className={`min-w-[300px] min-h-[300px] h-full w-full max-h-[640px] max-w-[640px] flex flex-col space-y-6 relative`}
        >
          <div className="w-full mx-auto flex items-center justify-center">
            <button
              type="button"
              onClick={async () => await startGame()}
              disabled={waiting || gameIsOngoing}
              className={`w-[200px] text-2xl p-4 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
            >
              {waiting
                ? "Waiting for opponent"
                : gameIsOngoing
                ? "Game is ongoing..."
                : "Start"}
            </button>
          </div>
          <div
            className={`w-full h-full bg-stone-200 grid grid-cols-8 gap-1 md:gap-2 relative rounded-md border-8`}
          >
            {!gameIsOngoing && (
              <div className="absolute inset-0 bg-stone-900/80 z-[9999]"></div>
            )}
            {xCoord.map((x) =>
              yCoord.map((y) => (
                <Tile
                  key={x + y}
                  x={x - 1}
                  y={y - 1}
                  claimTile={claimTile}
                  tilesOfGame={tilesOfGame ? tilesOfGame : null}
                  playerAddress={account ? account.address : null}
                  opponentAddress={
                    playersInGame
                      ? playersInGame[0]?.node?.player_address
                      : null
                  }
                />
              ))
            )}
          </div>
          <div className="w-full flex flex-row space-x-2 items-center justify-between">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 space-x-0 sm:space-y-0 sm:space-x-2">
              <div className="w-12 h-12 rounded-full bg-lime-300 border-2 border-lime-600 flex-none">
                <img src={player_avatar} className="w-full h-full" />
              </div>
              <div className="w-full flex flex-col space-y-0">
                <span className="text-sm uppercase font-semibold text-stone-200">
                  You (Player 1)
                </span>
                <div className="w-full flex flex-row space-x-3 items-center justify-start">
                  <div className="w-auto flex flex-row space-x-1 items-center">
                    <span className="w-2 h-2 rounded bg-lime-300"></span>
                    <span className="text-xs font-bold text-lime-300">
                      {my_flip_count}
                    </span>
                  </div>
                  <div className="w-auto flex flex-row space-x-1 items-center">
                    <span className="w-2 h-2 rounded bg-amber-300"></span>
                    <span className="text-xs font-bold text-amber-300">0</span>
                  </div>
                </div>
              </div>
            </div>
            <CountdownTimer startTime={startTime} duration={duration} />

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 space-x-0 sm:space-y-0 sm:space-x-2">
              <div className="w-12 h-12 rounded-full bg-amber-300 border-2 border-amber-600 flex-none">
                <img src={player_avatar} className="w-full h-full" />
              </div>
              <div className="w-full flex flex-col space-y-0">
                <span className="text-sm uppercase font-semibold text-stone-200">
                  Player 2
                </span>
                <div className="w-full flex flex-row space-x-3 items-center justify-start">
                  <div className="w-auto flex flex-row space-x-1 items-center">
                    <span className="w-2 h-2 rounded bg-amber-300"></span>
                    <span className="text-xs font-bold text-amber-300">
                      {opponent_flip_count}
                    </span>
                  </div>
                  <div className="w-auto flex flex-row space-x-1 items-center">
                    <span className="w-2 h-2 rounded bg-lime-300"></span>
                    <span className="text-xs font-bold text-lime-300">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Board;
