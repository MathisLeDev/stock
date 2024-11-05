import React, {useEffect, useState} from 'react';
import {
    Area,
    AreaChart, ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import CoinCapAxiosInstance from "../../axios/CoinCapAxiosInstance";
import {TempCandlesData} from "../../tempData/TempCandlesData";
import AxiosInstance from "../../axios/AxiosInstance";
import axiosInstance from "../../axios/AxiosInstance";
import {addAlert} from "../../rxjs/services/alertService";



const MarketGraph = (props) => {
    const {selectedAsset} = props;
    const [candleData, setCandleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [interval, setSelectedInterval] = useState('1m');
    const [marketAlerts, setMarketAlerts] = useState([]);


    const fetchForAlerts = () => {
        setIsLoading(true);
        AxiosInstance.get('/alert?companyName='+selectedAsset.id).then(response => {
            setMarketAlerts(response.data);
        }).catch(error => {
            console.log('error: ', error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if(!selectedAsset) return;



        fetchForAlerts();
    }, [selectedAsset]);


    useEffect(() => {
        const fetchForCandlesData = () => {
            setIsLoading(true);
            CoinCapAxiosInstance.get(`/candles?exchange=binance&interval=${interval}&baseId=bitcoin&quoteId=bitcoin`).then(response => {
                if(response.data.data.length === 0) {
                    setCandleData(TempCandlesData.data);
                } else {
                    setCandleData(response.data.data);
                }
            }).catch(error => {
                console.log('error: ', error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
        fetchForCandlesData();
        //setCandleData(TempCandlesData.data);
    }, [interval]);

// Transformer la donnée pour avoir des timestamps lisibles
    const formattedData = candleData.map((item) => ({
        ...item,
        close: parseFloat(item.close), // Assure-toi que `close` est bien un nombre
        period: new Date(item.period).toLocaleDateString()
        //.format('DD/MM/YYYY') // Formate le timestamp pour un affichage en date
    }));

    const handleRemoveAlert = (alert) => {
        axiosInstance.patch('/alert?alertId='+alert.id).then(response => {
            addAlert({type: 'success', message: 'Alert removed successfully'})
            fetchForAlerts()
        }).catch(error => {
            addAlert({type: 'error', message: 'Error removing alert'})
            console.error('error: ', error);
        })
    }

    return (

        <div className="card bg-base-200 p-6 rounded-lg flex-1">
            <div className={"ml-auto flex flex-row gap-2"}>
                <span className={`btn ${interval === "m1" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('m1')}>1m</span>
                <span className={`btn ${interval === "m30" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('m30')}>30m</span>
                <span className={`btn ${interval === "h1" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('h1')}>1h</span>
                <span className={`btn ${interval === "h12" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('h12')}>12h</span>
                <span className={`btn ${interval === "d1" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('d1')}>1d</span>
                <span className={`btn ${interval === "w1" && 'bg-base-100'}`} onClick={()=>setSelectedInterval('w1')}>1w</span>
            </div>
            <ResponsiveContainer>
            <AreaChart data={formattedData}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="close" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                {/* Ligne de limite */}
                {marketAlerts.map((alert, index) => (
                    <ReferenceLine isFront key={index} y={alert.value} strokeWidth={2} stroke="red" onClick={()=>handleRemoveAlert(alert)}/>
                ))}

            </AreaChart>
            </ResponsiveContainer>

        </div>
    );
};

export default MarketGraph;