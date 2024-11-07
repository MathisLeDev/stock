import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                }
            ]
        }
    ]);

    return (
            <RouterProvider router={router} />
    );


}

export default App;
