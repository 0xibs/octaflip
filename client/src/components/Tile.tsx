import { useEffect } from "react";
import { TILE_COLOR } from "../utils/constants";

const Tile = ({
  key,
  x,
  y,
  tilesOfGame,
  playerGreen,
  playerYellow,
  playerAddress,
  claimTile,
}: {
  key: number;
  x: number;
  y: number;
  tilesOfGame: Array<any>;
  playerGreen: string;
  playerYellow: any;
  playerAddress: string;
  claimTile: (x: string, y: string) => Promise<void>;
}) => {
  const getTileColor = (): string => {
    let tileColor: TILE_COLOR = TILE_COLOR.NONE;

    tilesOfGame?.map((tile) => {
      const xTile = tile?.node?.x;
      const yTile = tile?.node?.y;
      const claimer = tile?.node?.claimed;

      if (xTile == x && yTile == y) {
        if (claimer == playerGreen) {
          tileColor = TILE_COLOR.GREEN;
        } else if (claimer == playerYellow) {
          tileColor = TILE_COLOR.YELLOW;
        } else {
          tileColor = TILE_COLOR.NONE;
        }
      }
    });

    return tileColor;
  };

  return (
    <div>
      <button
        onClick={async () => await claimTile(x.toString(), y.toString())}
        key={key}
        className={`w-full py-6 sm:py-8 ${
          getTileColor() == TILE_COLOR.GREEN
            ? "bg-lime-500"
            : getTileColor() == TILE_COLOR.YELLOW
            ? "bg-amber-500"
            : "bg-stone-600"
        } cursor-pointer items-center flex justify-center mx-auto text-lg md:text-xl font-black text-stone-100  transition duration-350 ease-in-out transform hover:scale-100 rounded-md`}
      ></button>
    </div>
  );
};

export default Tile;
