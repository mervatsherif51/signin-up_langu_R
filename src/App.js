import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/signin/Sigin.jsx";
import Profile from "./pages/Profile";
// for level2 To Make Dark mode
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Error404 from "./pages/Error404";
import EditTask from "pages/edit-task/editTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },

  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/edit-task/editTask/:stringId",
    element: <EditTask />,
  },

  {
    path: "/About",
    element: <About />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },


]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
