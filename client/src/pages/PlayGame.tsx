import { useNavigate } from "react-router";

const PlayGame = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/new")}>New</button>
    </div>
  );
};

export default PlayGame;
