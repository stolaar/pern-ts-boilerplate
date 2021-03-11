import {IReduxAction} from "../../interfaces/IReduxAction.interface";
import {SET_ERRORS} from "../actionTypes";

export interface IErrorsState {
    [k: string]: any
}

export default (state = {}, action: IReduxAction): IErrorsState => {
    switch (action.type) {
        case SET_ERRORS:
            return action.payload;
        default:
            return {};
    }
};
