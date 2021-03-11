import {IReduxAction} from "../../interfaces/IReduxAction.interface";
import {SET_LANG} from "../actionTypes";

export enum Languages {
    en= 'en',
    mk='mk'
}

export type Lang = 'en' | 'mk'

export interface ILangState {
    lang: Lang;
}

const initialState = {
    lang: Languages.en
}

export default (state = initialState, action: IReduxAction): ILangState => {
    switch (action.type) {
        case SET_LANG:
            return {...state, lang: action.payload}
        default:
            return state
    }
}
