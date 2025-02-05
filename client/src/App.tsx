import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Initiate from "./components/Initiate";
const App = () => {
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
