import {BehaviorSubject} from "rxjs";

const initialState = {}

/**
 * BehaviorSubject to hold the list of alerts
 */
const marketWebSocketService$ = new BehaviorSubject(initialState);

const getMarketById = (id) => {
    return marketWebSocketService$.getValue()[id];
}

const addMarket = (newMarketData) => {
    marketWebSocketService$.next({
        ...marketWebSocketService$.getValue(),
        ...newMarketData // Fusionne le nouvel objet avec l'état actuel
    });
}

export {marketWebSocketService$, getMarketById, addMarket};
