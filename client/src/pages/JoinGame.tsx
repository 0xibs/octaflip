import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys, getEvents } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const JoinGame = () => {
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingNewGame, setCreatingNewGame] = useState(false);
  const { useDojoStore, client } = useDojoSDK();
  const { account } = useAccount();
  const state = useDojoStore((state) => state);
  const entities = useDojoStore((state) => state.entities);

  const entityId = useMemo(() => {
    if (account) {
      return getEntityIdFromKeys([BigInt(account.address)]);
    }
    return BigInt(0);
  }, [account]);

  const joinGame = async () => {
    if (!gameId) {
      toast.error("Invalid game id");
      return;
    }

    if (!account) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      setCreatingNewGame(true);

      const { transaction_hash } = await client.actions.joinGame(
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

      toast.success("Joined game successfully");
    } catch (e: any) {
      toast.error(e);
    } finally {
      setCreatingNewGame(false);
    }
  };

  useEffect(() => {
    if (account) {
    }

    return () => {};
  }, [account]);

  return (
    <div className="bg-stone-900 w-full min-h-screen h-full">
      <div
        className={`w-full h-full min-h-[80vh] justify-center items-center mx-auto flex flex-col space-y-6 relative`}
      >
        <div className="w-full mx-auto flex flex-col items-center justify-center space-y-8">
          <input
            type="text"
            className="outline-none w-full max-w-[400px] bg-transparent border-b-2 p-4 uppercase border-stone-600 text-center text-2xl text-stone-100 font-bold tracking-wide"
            placeholder="Game Code"
            onChange={(e) => setGameId(e.target.value)}
            value={gameId}
          />
          <button
            type="button"
            onClick={async () => await joinGame()}
            className={`text-md py-2 px-4 sm:text-2xl sm:py-4 sm:px-8 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
