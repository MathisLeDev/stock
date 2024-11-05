import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Alert from "../rxjs/interface/Alert";
import Home from "./Home";

const Root = () => {
    const location = useLocation().pathname;


    return (<div>
            <div className={'flex flex-row'}>
                <div className={'flex flex-col flex-1'}>
                    {/*Liste des alertes*/}
                    <Alert/>
                    <div className={'flex-1'}>
                        {location !== '/' ? <Outlet/> : <Home/>}
                    </div>
                </div>
            </div>

            <Outlet/>
        </div>
    );
};

export default Root;