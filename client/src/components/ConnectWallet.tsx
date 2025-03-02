import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import { useCallback, useEffect, useState } from "react";
import ControllerConnector from "@cartridge/connector/controller";

export function ConnectWallet() {
  const { connectAsync, connectors } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [pendingConnectorId, setPendingConnectorId] = useState<
    string | undefined
  >(undefined);

  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  const connect = useCallback(
    async (connector: Connector) => {
      setPendingConnectorId(connector.id);
      try {
        await connectAsync({ connector });
      } catch (error) {
        console.error(error);
      }
      setPendingConnectorId(undefined);
    },
    [connectAsync]
  );

  function isWalletConnecting(connectorId: string) {
    return pendingConnectorId === connectorId;
  }

  if (undefined !== address) {
    return (
      <div className="mt-10">
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => disconnect()}
            className="text-white border cursor-pointer border-white p-3"
          >
            {username ? username : "Connected"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-white">Connect Wallet</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect(connector)}
            disabled={!connector.available()}
            className="text-white border border-white p-3"
          >
            Connect {connector.name}
            {isWalletConnecting(connector.id) && "Connecting"}
          </button>
        ))}
      </div>
    </div>
  );
}
