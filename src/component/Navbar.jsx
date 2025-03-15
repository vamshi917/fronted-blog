import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="flex gap-10 justify-center item-center
  text-lg font-bold py-3 shadow-md"
    >
      <Link to="/">Home</Link>
      <Link to="create">Create</Link>
    </nav>
  );
};

export default Navbar;
