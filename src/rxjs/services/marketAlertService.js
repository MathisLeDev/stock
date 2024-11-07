import {BehaviorSubject} from "rxjs";

const initialState = []

const marketAlertService$ = new BehaviorSubject(initialState);

const addMarketAlert = (alert) => {
    marketAlertService$.next([...alert]);
}

const getMarketAlertsById = (id) => {
    return marketAlertService$.getValue().filter(alert => alert.companyId === id);
}

const removeMarketAlert = (alertId) => {
    marketAlertService$.next(marketAlertService$.getValue().filter(alert => alert.id !== alertId));
}


export {marketAlertService$, addMarketAlert, removeMarketAlert, getMarketAlertsById};