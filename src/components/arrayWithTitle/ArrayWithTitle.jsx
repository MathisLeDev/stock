import React, {useEffect, useState} from 'react';
import {marketWebSocketService$} from "../../rxjs/services/marketWebSocketService";

const PAGE_SIZE = 10; // Nombre d'échanges par page
const ArrayWithTitle = (props) => {
    const {title, array, onSelect} = props;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(array.length / PAGE_SIZE) || 1;
    const displayedExchanges = array.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
    const [marketWebSocket, setMarketWebSocket] = useState(null);

    useEffect(() => {
        const sub = marketWebSocketService$.subscribe({
            next: value => setMarketWebSocket(value),
        });

        return () => {
            sub.unsubscribe();
        }
    }, []);

    return (
        <div className="overflow-x-auto bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold">{title}</h2>
            <table className="table">
                <tbody>
                {/* row 1 */}
                {displayedExchanges.map((exchange, index) => (
                    <tr key={exchange.id} className="hover flex flex-row justify-between" onClick={() => onSelect(exchange)}>
                        <th className={'flex flex-col'}><span className={'font-semibold my-auto text-xl'}>{exchange.rank}</span></th>
                        <td className={'flex flex-col flex-1'}><span className={'text-xs text-neutral'}>Price</span><span className={'font-semibold'}>{exchange.name}</span></td>
                        <td className={'flex flex-col flex-1'}><span className={'text-xs text-neutral'}>Change</span><span className={`${Number(exchange.changePercent24Hr) > 0 ? "text-green-500" : "text-red-500"}  font-semibold`}>{Number(exchange.changePercent24Hr).toFixed(2)}%</span></td>
                        <td className={'flex flex-col '}><span className={'text-xs text-neutral'}>Current Value</span><span className={'font-semibold'}>{marketWebSocket[exchange.id] ? marketWebSocket[exchange.id] :  Number(exchange.priceUsd).toFixed(2)}$ </span></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    className="btn"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    className="btn"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>


    );
};

export default ArrayWithTitle;