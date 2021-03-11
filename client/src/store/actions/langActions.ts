import {SET_LANG} from "../actionTypes";
import {Lang} from "../reducers/langReducer";
import {Action, ActionCreator} from "redux";

export interface ISetLangAction extends Action<typeof SET_LANG>{payload: Lang}

export const setLang: ActionCreator<ISetLangAction> = (payload: Lang) => ({type: SET_LANG, payload})
