import './App.css';
import {useEffect, useState} from "react";
import coinCapAxiosInstance from "./axios/CoinCapAxiosInstance";
import Navbar from "./components/navbar/Navbar";
import Drawer from "./components/drawer/Drawer";
import Footer from "./components/footer/Footer";
import {TempAssetsData} from "./tempData/TempAssetsData";
import ArrayWithTitle from "./components/arrayWithTitle/ArrayWithTitle";
import MarketGraph from "./components/graphs/MarketGraph";
import MarketInfo from "./components/market/MarketInfo";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/login/Login";

function App() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                }]
        }
    ]);

    return (
            <RouterProvider router={router} />
    );


}

export default App;
