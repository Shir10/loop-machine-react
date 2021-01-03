import { createStore, combineReducers,  } from 'redux';
import initialState from "./initialState";
import PadsContainerReducer from '../components/PadsContainer/reducer';

const RootReducer = combineReducers({
    padsContainer: PadsContainerReducer,
});

export const store = createStore(
    RootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;