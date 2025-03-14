import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEvents } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { extractErrorMessageFromJSONRPCError } from "../utils/helpers";

const JoinGame = () => {
  const [gameId, setGameId] = useState("");
  const [joiningGame, setJoiningGame] = useState(false);
  const { client } = useDojoSDK();
  const { account } = useAccount();

  const navigate = useNavigate();

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
      const join = await client.actions.joinGame(account, gameId);

      const transaction_hash = join.transaction_hash;
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

      navigate(`/play/${gameId}`, { replace: false });
    } catch (e: any) {
      const errorMessage = extractErrorMessageFromJSONRPCError(
        JSON.stringify(e)
      );
      toast.error(errorMessage);
    } finally {
      setJoiningGame(false);
    }
  };

  // useEffect(() => {
  //   return () => {};
  // }, []);

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
            className={`text-md cursor-pointer py-2 px-4 sm:text-2xl sm:py-4 sm:px-8 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
