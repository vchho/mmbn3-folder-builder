import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Let's go back</h1>
      <Link to={"/"}>
        <img src="https://cdn.discordapp.com/attachments/210560171649269760/489644484850876446/17-MMBN3Update6146.png" />
      </Link>
    </div>
  );
};
