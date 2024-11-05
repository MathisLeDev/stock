import React, {useEffect, useState} from 'react';
import { Bar,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import CoinCapAxiosInstance from "../../axios/CoinCapAxiosInstance";
import {TempCandlesData} from "../../tempData/TempCandlesData";



const MarketGraph = (props) => {
    const {title} = props;
    const [messages, setMessages] = useState();
    const [candleData, setCandleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [interval, setSelectedInterval] = useState('1m');

    useEffect(() => {
        const fetchForCandlesData = () => {
            setIsLoading(true);
            CoinCapAxiosInstance.get(`/candles?exchange=binance&interval=${interval}&baseId=bitcoin&quoteId=bitcoin`).then(response => {
                setCandleData(response.data.data);
            }).catch(error => {
                setMessages(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }

        fetchForCandlesData();
        //setCandleData(TempCandlesData.data);
    }, [interval]);




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
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={candleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Bar
                        dataKey="high"
                        fill="transparent"
                        stroke="black"
                        stackId="a"
                        shape={(props) => {
                            const { x, y, width, height, payload } = props;
                            const color = payload.open > payload.close ? '#ff0000' : '#00ff00'; // Rouge si le prix baisse, vert s'il monte

                            return (
                                <g>
                                    {/* Ligne haute-basse */}
                                    <line
                                        x1={x + width / 2}
                                        x2={x + width / 2}
                                        y1={y}
                                        y2={y + height}
                                        stroke={color}
                                    />
                                    {/* Rectangle d'ouverture/fermeture */}
                                    <rect
                                        x={x}
                                        y={payload.open > payload.close ? y + height : y}
                                        width={width}
                                        height={Math.abs(height)}
                                        fill={color}
                                    />
                                </g>
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MarketGraph;