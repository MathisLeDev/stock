import React, {useEffect, useState} from 'react';
import AlertInstance from "./AlertInstance";
import {alerts$} from "../services/alertService";


const Alert = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        alerts$.subscribe({
            next: value => setAlerts(value),
            error: err => console.error(err),
        });
    }, [alerts])

    return (
        <div className={'fixed w-full'}>
            {alerts?.map((alert) => (
                <AlertInstance alert={alert} key={alert.id}/>
            ))}
        </div>
    );
};

export default Alert;
