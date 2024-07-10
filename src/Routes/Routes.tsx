import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SigninPage from "../Pages/SigninPage/SigninPage";
import SignupPage from "../Pages/SignupPage/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <SigninPage />,
      },
      {
        path: "SignupPage",
        element: <SignupPage />,
      },
    ],
  },
]);
