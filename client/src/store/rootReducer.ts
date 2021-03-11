import { combineReducers } from 'redux'
import errors from './reducers/errorsReducer'
import auth from "../pages/auth/services/authReducer"
import feedback from "./reducers/feedbackReducer";
import navigation from "./reducers/navigationReducer"
import lang from "./reducers/langReducer";

const rootReducer = combineReducers({
    errors,
    auth,
    feedback,
    navigation,
    lang
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
