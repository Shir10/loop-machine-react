import initialState from "../../store/initialState";
import PadsContainerConstants from './constants';
import PadConstants from '../Pad/constants';


const PadsContainerReducer = (state = initialState.padsContainer, action) => {
    switch (action.type) {
        case PadsContainerConstants.LOAD_PADS_STATUS:
            return { ...state, padsStatusArray: action.payload.padsStatusArray };
        case PadConstants.CHANGE_PAD_STATUS:
            return { ...state, padsStatusArray: action.payload.padsStatusArray };
        default:
            return state;
    }
};

export default PadsContainerReducer;