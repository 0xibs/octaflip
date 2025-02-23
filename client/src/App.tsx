import Header from "./components/Header";
import Board from "./components/Board";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { getEntityIdFromKeys, getEvents } from "@dojoengine/utils";
import { useNavigate } from "react-router";
const App = () => {
  const { useDojoStore, client, sdk } = useDojoSDK();
  const { account } = useAccount();
  const state = useDojoStore((state) => state);
  const entities = useDojoStore((state) => state.entities);

  let navigate = useNavigate();

  const entityId = useMemo(() => {
    if (account) {
      return getEntityIdFromKeys([BigInt(account.address)]);
    }
    return BigInt(0);
  }, [account]);

  return (
    <>
      <div className="bg-stone-900 w-full min-h-screen h-full">
        <Header />
        <div className="py-12 w-full h-full items-center justify-center flex flex-col space-y-4 px-8">
          <div
            className={`w-full h-full min-h-[80vh] justify-center items-center mx-auto flex flex-col space-y-6 relative`}
          >
            <div className="w-full mx-auto flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => navigate("/new")}
                className={`text-md py-2 px-4 sm:text-2xl sm:py-4 sm:px-8 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
              >
                NEW GAME
              </button>
              <button
                type="button"
                onClick={() => navigate("/join")}
                className={`text-md py-2 px-4 sm:text-2xl sm:py-4 sm:px-8 text-center font-black text-stone-100 bg-stone-600 rounded-xl border-2 border-stone-600 shadow-inner`}
              >
                JOIN GAME
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
