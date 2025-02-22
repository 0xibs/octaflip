import Header from "./components/Header";
import Board from "./components/Board";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
const App = () => {
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

  return (
    <>
      <div className="bg-stone-900 w-full min-h-screen h-full">
        <Header />
        <div className="py-12 w-full h-full items-center justify-center flex flex-col space-y-4 px-8">
          <Board />
        </div>
      </div>
    </>
  );
};

export default App;
