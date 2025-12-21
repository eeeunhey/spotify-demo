import { Link, Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      <h1>Sidebar</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/search">
        <button>Search</button>
      </Link>
      {/* 자식컴포넌트를 Outlet에서 보여준다 */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
