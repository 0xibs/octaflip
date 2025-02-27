import { useEffect } from "react";

const Tile = ({
  key,
  x,
  y,
  tilesOfGame,
  playerAddress,
  opponentAddress,
  claimTile,
}: {
  key: number;
  x: number;
  y: number;
  tilesOfGame: Array<any>;
  playerAddress: any;
  opponentAddress: any;
  claimTile: (x: string, y: string) => Promise<void>;
}) => {
  const tileClaimed = (): string => {
    let tileClaimer: "PLAYER" | "OPPONENT" | "NONE" = "NONE";

    tilesOfGame?.map((tile) => {
      const xTile = tile?.node?.x;
      const yTile = tile?.node?.y;
      const claimer = tile?.node?.claimed;

      if (xTile == x && yTile == y) {
        if (claimer == playerAddress) {
          tileClaimer = "PLAYER";
        } else if (claimer == opponentAddress) {
          tileClaimer = "OPPONENT";
        } else {
          tileClaimer = "NONE";
        }
      }
    });

    return tileClaimer;
  };

  return (
    <div>
      <button
        onClick={async () => await claimTile(x.toString(), y.toString())}
        key={key}
        className={`w-full py-6 sm:py-8 ${
          tileClaimed() == "PLAYER"
            ? "bg-lime-500"
            : "OPPONENT"
            ? "bg-amber-500"
            : "bg-stone-600"
        } cursor-pointer items-center flex justify-center mx-auto text-lg md:text-xl font-black text-stone-100  transition duration-500 ease-in-out transform hover:scale-100 rounded-md`}
      ></button>
    </div>
  );
};

export default Tile;
