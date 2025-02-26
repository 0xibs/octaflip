import React, { useState, useContext, useMemo } from "react";
import player_avatar from "./../assets/images/user.png";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount, useTransactionReceipt } from "@starknet-react/core";
import { getEntityIdFromKeys, getEvents } from "@dojoengine/utils";
import { GetTransactionReceiptResponse } from "starknet";

const Board = () => {
  const [start, setStart] = useState<boolean>(false);
  const [join, setJoin] = useState<boolean>(false);
  const [game_started, setGameStarted] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(0);
  const [my_flip_count, setMyFlipCount] = useState<number>(0);
  const [opponent_flip_count, setOpponentFlipCount] = useState<number>(14);
  const [player, setPlayer] = useState<number>(0);
  const [my_tiles, setMyTiles] = useState<number[]>([]);
  const [opponent_tiles, setOpponentTiles] = useState<number[]>([
    1, 5, 4, 19, 23, 40, 30, 10, 22, 63, 62, 60, 56, 57,
  ]);

  // ////////////////////////////////
  const [game_id, setGameId] = useState("");
  const { useDojoStore, client, sdk } = useDojoSDK();
  const { account } = useAccount();
  const state = useDojoStore((state) => state);
  const entities = useDojoStore((state) => state.entities);

  const entityId = useMemo(() => {
    if (account) {
      return getEntityIdFromKeys([BigInt(account.address)]);
    }
    return BigInt(0);
  }, [account]);

  // ///////////////////////////////

  const handleSetPlay = () => {
    setPlay(!play);
  };

  const removeFromMyTiles = (id: number) => {
    const tile_exist_in_my_tiles = my_tiles.indexOf(id);
    if (tile_exist_in_my_tiles !== -1) {
      const new_my_tiles = my_tiles.filter((tile) => tile !== id);
      setMyTiles(new_my_tiles);
      if (id == turn) {
        setTurn(0);
      }
    }
  };

  const removeFromOpponentTiles = (id: number) => {
    const tile_exist_in_opponent_tiles = opponent_tiles.indexOf(id);
    if (tile_exist_in_opponent_tiles !== -1) {
      const new_opponent_tiles = opponent_tiles.filter((tile) => tile !== id);
      setOpponentTiles(new_opponent_tiles);
      if (id == turn) {
        setTurn(0);
      }
    }
  };

  const handleSetTurn = (id: number) => {
    if (!play) {
      return;
    }
    removeFromMyTiles(id);
    removeFromOpponentTiles(id);
    setTurn(id);
    my_tiles.push(id);
    setMyTiles(my_tiles);
    setMyFlipCount(my_flip_count + 1);
  };

  const handleJoinGame = () => {
    setJoin(!join);
    setTimeout(() => {
      setGameStarted(true);
      setStart(true);
      setJoin(true);
    }, 3000);
  };

  const tiles = Array.from({ length: 64 }, (_, i) => Number(i + 1));

  return (
    <>
      <div className="bg-stone-900 w-full min-h-screen h-full">
        <div
          className={`min-w-[300px] min-h-[300px] h-full w-full max-h-[640px] max-w-[640px] flex flex-col space-y-6 relative`}
        >
          <div className="w-full mx-auto flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleSetPlay()}
              className={`w-[200px] text-2xl p-4 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
            >
              {play ? "PAUSE" : "PLAY"}
            </button>
          </div>
          <div
            className={`w-full h-full bg-stone-200 grid grid-cols-8 gap-1 md:gap-2 relative rounded-md border-8`}
          >
            {!play && (
              <div className="absolute inset-0 bg-stone-900/80 z-[9999]"></div>
            )}
            {tiles.map((tile, index) => (
              <button
                onClick={() => handleSetTurn(tile)}
                key={index}
                className={`w-full py-6 sm:py-8 ${
                  !my_tiles.includes(tile) && !opponent_tiles.includes(tile)
                    ? "bg-stone-600"
                    : my_tiles.includes(tile)
                    ? "bg-lime-500"
                    : "bg-amber-500"
                } cursor-pointer items-center flex justify-center mx-auto text-lg md:text-xl font-black text-stone-100  transition duration-500 ease-in-out transform hover:scale-100 rounded-md`}
              >
                {/* {tile} */}
              </button>
            ))}
          </div>
          <div className="w-full flex flex-row space-x-2 items-center justify-between">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 space-x-0 sm:space-y-0 sm:space-x-2">
              <div className="w-12 h-12 rounded-full bg-lime-300 border-2 border-lime-600 flex-none">
                <img src={player_avatar} className="w-full h-full" />
              </div>
              <div className="w-full flex flex-col space-y-0">
                <span className="text-sm uppercase font-semibold text-stone-200">
                  Player 1
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
            <div className="w-auto text-2xl font-medium text-stone-100">
              00:30
            </div>
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
