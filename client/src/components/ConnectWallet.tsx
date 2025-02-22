import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useState } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { Button } from "@cartridge/ui-next";

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  return (
    <div>
      {address ? (
        <Button
          className="px-4 py-2 rounded-xl text-sm text-stone-300 bg-stone-600 shadow-inner border-2 border-stone-700 pointer"
          onClick={() => disconnect()}
        >
          {username && <p>{username}</p>}
        </Button>
      ) : (
        <Button
          className="px-4 py-2 rounded-xl text-sm text-stone-300 bg-stone-600 shadow-inner border-2 border-stone-700 pointer"
          onClick={() => connect({ connector: controller })}
        >
          Connect
        </Button>
      )}
    </div>
  );
}
