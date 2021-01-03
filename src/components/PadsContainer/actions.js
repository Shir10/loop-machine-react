import PadsContainerConstants from './constants';
import { PadStatus } from '../Pad/constants';

function loadPadsStatusAction() {
    const padsStatusArray = [];
    // Initialize the padsStatusArray to stopping status for each pad
    for(let i = 0; i < 9; i++) {
        padsStatusArray.push(PadStatus.STOPPING);
    }
    return {
        type: PadsContainerConstants.LOAD_PADS_STATUS,
        payload: {
            padsStatusArray
        }
    }
}

const PadsContainerActions = {
    loadPadsStatusAction
};

export default PadsContainerActions;