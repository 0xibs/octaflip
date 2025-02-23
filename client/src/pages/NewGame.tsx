import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys, getEvents } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const NewGame = () => {
  // ////////////////////////////////
  const [game_id, setGameId] = useState("");
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

  // ///////////////////////////////

  const createNewGame = async () => {
    if (!account) {
      toast.error("Wallet not connected");
      return;
    }
    try {
      setCreatingNewGame(true);

      const { transaction_hash } = await client.actions.createGame(account);
      getEvents(
        await account?.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      const tx: any = await account.getTransactionReceipt(transaction_hash);
      setGameId(tx.events[0].data[3]);

      // if (game_id) {
      //   setStart(!start);
      // }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setCreatingNewGame(false);
    }
  };

  useEffect(() => {
    if (account) {
      createNewGame();
    }

    return () => {};
  }, [account]);

  return (
    <div className="bg-stone-900 w-full min-h-screen h-full">
      {creatingNewGame ? (
        <div>Creating new game...</div>
      ) : (
        <div
          className={`w-full h-full min-h-[80vh] justify-center items-center mx-auto flex flex-col space-y-6 relative`}
        >
          <div className="w-full mx-auto flex flex-col items-center justify-center space-y-8">
            <span
              className={`text-md py-2 px-4 text-center font-black text-stone-600 `}
            >
              Share game code..
            </span>
            <input
              type="text"
              readOnly
              className="outline-none w-full max-w-[400px] bg-transparent border-b-2 p-4 uppercase border-stone-600 text-center text-6xl text-stone-300 font-bold tracking-wide"
              placeholder="1234"
              value={game_id}
            />
            <span
              className={`text-md py-2 px-4 text-center font-black text-stone-100 `}
            >
              Waiting for opponent
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewGame;
