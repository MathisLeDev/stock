import React from 'react';
import axiosInstance from "../../axios/AxiosInstance";
import {addAlert} from "../../rxjs/services/alertService";

const MarketInfo = (props) => {
    const {exchange} = props;
    const [value, setValue] = React.useState(0);
    const [shouldBeLower, setShouldBeLower] = React.useState(false);
    const [alertCreationLoading, setAlertCreationLoading] = React.useState(false);

    const handleAlertCreation = () => {
        setAlertCreationLoading(true);
        const body = {
            companyId: exchange.id,
            value:Number(value),
            shouldBeLower
        }
        axiosInstance.post('/alert', body)
            .then(response => {
            addAlert({type: 'success', message: 'Alert created successfully'})
            setValue(0);
            setShouldBeLower(false);
            document.getElementById('my_modal_1').close()})
            .catch(error => {
                addAlert({type: 'error', message: 'Error creating alert'})
                console.error('error: ', error);
            }).finally(() => {
            setAlertCreationLoading(false);
        })
    }

    const handleAlertCancel = () => {
        setValue(0);
    }

    return (
        <div className={'card bg-base-200  rounded-lg p-6 flex-[0.5]'}>

            {exchange && <>
                <h1 className={'text-4xl font-semibold'}>
                    {exchange.name}
                </h1>
                <div>
                    <div className={'card-body'}>
                        <p className={'text-sm text-gray-500'}>Rank: {exchange.rank}</p>
                        <div>
                            <p className={'text-sm text-gray-500'}>Volume (USD): ${exchange.volumeUsd}</p>
                            <p className={'text-sm text-gray-500'}>Total Volume
                                Percentage: {exchange.percentTotalVolume}%</p>
                        </div>
                        <p className={'text-sm text-gray-500'}>Trading Pairs: {exchange.tradingPairs}</p>
                        <button className="btn btn-primary mt-2"
                                onClick={() => document.getElementById('my_modal_1').showModal()}>Create Alert
                        </button>

                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg relative">Setup an Alert</h3>
                                <div className={'flex flex-row justify-between'}>
                                    <div className={'flex flex-col gap-4'}>
                                        <label htmlFor="price" className={'flex flex-row items-center gap-4'}>
                                            <input type={'radio'} className={'radio'} id={'price'} name={'alert'}
                                                   value={'price'}/>
                                            Should not be higher than
                                        </label>
                                        <label htmlFor="volume" className={'flex flex-row items-center gap-4'}>
                                            <input type={'radio'} className={'radio'} id={'volume'} name={'alert'}
                                                   value={'volume'}/>
                                            Should not be lower than
                                        </label>
                                    </div>
                                    <input type={'text'} onChange={(e)=>setValue(e.target.value)} className={'input bg-base-200 my-auto'} placeholder={'$'}/>
                                </div>

                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog" className={'border w-full flex flex-row justify-between'}>
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn bg-red-700/80" onClick={handleAlertCancel}>Cancel</button>
                                        <button className="btn" onClick={handleAlertCreation}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </>
            }

            {!exchange && <p className={'text-lg text-gray-500'}>Select an exchange to view more info</p>}
        </div>
    );
};

export default MarketInfo;