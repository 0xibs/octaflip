import logo from "./../assets/images/flip.png";
import { ConnectWallet } from "./ConnectWallet";
import { useNavigate } from "react-router";
import { CONFIG } from "../config";
import { ENV_OPTIONS } from "../utils/constants";
import { ConnectLocalWallet } from "./ConnectLocalWallet";
const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full h-[60px] bg-stone-900 items-center flex justify-center mx-auto px-8 py-4">
        <nav className="w-full sm:max-w-[90%] items-center flex justify-between">
          <h2 className="text-2xl font-black w-auto flex items-center justify-center space-x-2">
            <span className="text-stone-300">OCTA</span>
            <img
              src={logo}
              alt="logo"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="text-stone-400">FLIP</span>
          </h2>
          <button
            type="button"
            onClick={() => navigate("/new")}
            className="px-4 py-2 rounded-xl text-sm text-stone-300 bg-stone-600 shadow-inner border-2 border-stone-700"
          >
            New
          </button>
          <button
            type="button"
            onClick={() => navigate("/join")}
            className="px-4 py-2 rounded-xl text-sm text-stone-300 bg-stone-600 shadow-inner border-2 border-stone-700"
          >
            Join
          </button>
          {CONFIG.ENV === ENV_OPTIONS.LOCAL ? (
            <ConnectLocalWallet />
          ) : (
            <ConnectWallet />
          )}
        </nav>
      </header>
    </>
  );
};
export default Header;
