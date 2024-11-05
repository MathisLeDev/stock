import React from 'react';

const MarketInfo = (props) => {
    const {exchange} = props;
    return (
        <div className={'card bg-base-200  rounded-lg p-6'}>

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
                        <a href={exchange.exchangeUrl} className={'btn btn-primary mt-2'} target={'_blank'}>Visit
                            Exchange</a>
                    </div>
                </div>
            </>
            }

            {!exchange && <p className={'text-lg text-gray-500'}>Select an exchange to view more info</p>}
        </div>
    );
};

export default MarketInfo;