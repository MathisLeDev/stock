import {BehaviorSubject} from "rxjs";

/**
 * Initial state of alerts
 */
const initialState = []

/**
 * BehaviorSubject to hold the list of alerts
 */
const alerts$ = new BehaviorSubject(initialState);

/**
 * Function to add alert
 * @param alert
 */
const addAlert = (alert) => {
    const id = Math.floor(Math.random() * 1000);
    const alertWithId = {id, alert};
    alerts$.next([...alerts$.getValue(), alertWithId]);

    // Remove alert after 5 seconds
    setTimeout(() => {
        removeAlert(id);
    }, Number(process.env.REACT_APP_ALERT_TIMEOUT) || 3000);
}

/**
 * Function to remove alert
 * @param id
 */
const removeAlert = (id) => {
    alerts$.next(alerts$.getValue().filter(alert => alert.id !== id));
}

export {alerts$, addAlert, removeAlert};
