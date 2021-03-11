import {Action, ActionCreator} from "redux";
import {SET_ACTIVE_TAB} from "../actionTypes";

export interface ISetActiveTab extends Action<typeof SET_ACTIVE_TAB> {
    payload: number | string;
}

export const setActiveTab: ActionCreator<ISetActiveTab> = (payload: number | string) => ({type: SET_ACTIVE_TAB, payload})
