import React from 'react';
import {removeAlert} from "../services/alertService";


const AlertInstance = (props) => {
    const alert = props.alert;

    return (
        <div key={props.alert.id}
             className={` ${props.alert.alert.type === 'success' ? 'bg-green-300' : 'bg-red-300'} p-3 w-full rounded-b-md backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-between`}>
            <div className={'flex gap-2 items-center'}>
                <span className={'text-white font-semibold'}>
                        {props.alert.alert.message}
                    </span>
            </div>
            <button className={'h-12 w-12 hover:bg-white/20 rounded-r-md active:bg-white/40 '}
                    onClick={() => removeAlert(props.alert.id)}>
            </button>
        </div>
    );
};

export default AlertInstance;