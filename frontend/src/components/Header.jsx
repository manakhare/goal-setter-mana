import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// useSelector - used to select something from the state. Like isLoading, isError etc
// useDispatch - to dispatch a function like register, the asynch thunk function... or reset fn of our reducer
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, deleteUser } from "../features/auth/authSlice";

function Header() {
  // Initializing
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); //the function defines which part of the STATE we want, that is -> user (state.user)

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const deleteMe = () => {
    dispatch(deleteUser());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>

      <ul>
        {user ? (
          <>
            <li>
              <button className="btn" onClick={deleteMe}>
                Delete Account
              </button>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="bt">
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="bt">
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
